import { RefObject, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function PreviewIframe({
  width,
  height,
  scale,
  isDragging,
  editMode = false,
  iframeRef,
  onDocumentReady,
  children,
}: {
  width: number;
  height: number;
  scale: number;
  isDragging: boolean;
  editMode?: boolean;
  iframeRef: RefObject<HTMLIFrameElement | null>;
  onDocumentReady?: (body: HTMLElement) => void | (() => void);
  children: React.ReactNode;
}) {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const copiedNodes = useRef<Map<Node, HTMLElement>>(new Map());

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    function copyHeadAssets() {
      const doc = iframe?.contentDocument;
      if (!doc) return;
      // Clone every <link rel="stylesheet"> and <style> tag from the host
      // document into the iframe so Tailwind's compiled CSS (and any
      // inline <style> blocks) is available inside the iframe's document too.
      // Re-syncs existing clones too (not just first-copy), so live edits to
      // the shared <style> block (theme.accent, hover/cursor rules, etc.)
      // don't go stale inside the iframe.
      document
        .querySelectorAll('link[rel="stylesheet"], style')
        .forEach((node) => {
          const existingClone = copiedNodes.current.get(node);
          if (existingClone && existingClone.isConnected) {
            if (existingClone.innerHTML !== (node as HTMLElement).innerHTML) {
              existingClone.innerHTML = (node as HTMLElement).innerHTML;
            }
            if (
              node.nodeName === "LINK" &&
              existingClone.getAttribute("href") !== (node as HTMLLinkElement).href
            ) {
              existingClone.setAttribute("href", (node as HTMLLinkElement).href);
            }
            return;
          }
          const clone = node.cloneNode(true) as HTMLElement;
          copiedNodes.current.set(node, clone);
          doc.head.appendChild(clone);
        });
      // Keep theme/dark-mode classes on <html> (e.g. class="dark") in sync,
      // since CSS variables driving your theme are usually scoped to :root/html.
      doc.documentElement.className = document.documentElement.className;
    }

    let iframeCleanup: (() => void) | null = null;

    function handleLoad() {
      const doc = iframe?.contentDocument;
      if (!doc) return;
      if (iframeCleanup) {
        iframeCleanup();
        iframeCleanup = null;
      }
      doc.body.style.margin = "0";
      doc.documentElement.style.minHeight = "100%";
      copyHeadAssets();

      // Hide the iframe's own native scrollbar and configure clean single-container scrolling
      if (!doc.getElementById("preview-iframe-scrollbar-reset")) {
        const style = doc.createElement("style");
        style.id = "preview-iframe-scrollbar-reset";
        style.textContent = `
          html {
            scrollbar-width: none;
            -ms-overflow-style: none;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            height: 100%;
          }
          body {
            scrollbar-width: none;
            -ms-overflow-style: none;
            overflow-y: visible !important;
            overflow-x: hidden !important;
            min-height: 100%;
            margin: 0;
          }
          html::-webkit-scrollbar, body::-webkit-scrollbar { display: none; width: 0; height: 0; }
        `;
        doc.head.appendChild(style);
      }

      // Wheel listener ensures that mouse wheel anywhere inside the iframe scrolls immediately
      const handleIframeWheel = (e: WheelEvent) => {
        const target = doc.scrollingElement || doc.documentElement || doc.body;
        if (target) {
          target.scrollTop += e.deltaY;
        }
      };

      // Pointer drag-to-scroll emulation for mobile responsive preview
      let isPointerDown = false;
      let startPointerY = 0;
      let startScrollTop = 0;

      const handlePointerDown = (e: PointerEvent | MouseEvent) => {
        if (editMode || e.button !== 0) return;
        const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
        if (targetTag === "input" || targetTag === "textarea" || targetTag === "select") return;
        const scrollTarget = doc.scrollingElement || doc.documentElement || doc.body;
        if (!scrollTarget) return;

        isPointerDown = true;
        startPointerY = e.clientY;
        startScrollTop = scrollTarget.scrollTop;
      };

      const handlePointerMove = (e: PointerEvent | MouseEvent) => {
        if (!isPointerDown || editMode) return;
        const dy = e.clientY - startPointerY;
        const scrollTarget = doc.scrollingElement || doc.documentElement || doc.body;
        if (scrollTarget) {
          scrollTarget.scrollTop = startScrollTop - dy;
        }
      };

      const handlePointerUp = () => {
        isPointerDown = false;
      };

      doc.addEventListener("wheel", handleIframeWheel, { passive: true });
      doc.addEventListener("pointerdown", handlePointerDown);
      doc.addEventListener("pointermove", handlePointerMove);
      doc.addEventListener("pointerup", handlePointerUp);
      doc.addEventListener("pointercancel", handlePointerUp);

      iframeCleanup = () => {
        doc.removeEventListener("wheel", handleIframeWheel);
        doc.removeEventListener("pointerdown", handlePointerDown);
        doc.removeEventListener("pointermove", handlePointerMove);
        doc.removeEventListener("pointerup", handlePointerUp);
        doc.removeEventListener("pointercancel", handlePointerUp);
      };

      setMountNode(doc.body);
      if (mountNode === doc.body && typeof cleanupRef.current === "function") {
        cleanupRef.current();
        cleanupRef.current = onDocumentReadyRef.current?.(doc.body);
      }
    }

    // A src-less iframe's document may already be "complete" by the time
    // this effect runs — handle both that case and the async load event.
    if (iframe.contentDocument?.readyState === "complete") {
      handleLoad();
    }
    iframe.addEventListener("load", handleLoad);

    // Vite (dev mode) injects/HMRs <style> tags into <head> at runtime —
    // keep the iframe's stylesheet set in sync as those show up.
    const observer = new MutationObserver(copyHeadAssets);
    observer.observe(document.head, { childList: true });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    return () => {
      if (iframeCleanup) {
        iframeCleanup();
        iframeCleanup = null;
      }
      iframe.removeEventListener("load", handleLoad);
      observer.disconnect();
    };
  }, [iframeRef, mountNode, editMode]);

  // Re-run whenever onDocumentReady changes (its deps include editMode, blocks,
  // site, device etc.). This replaces stale event-listener closures — e.g. the
  // one that had editMode=false before the user toggled edit mode on.
  const cleanupRef = useRef<(() => void) | void>(undefined);
  const onDocumentReadyRef = useRef(onDocumentReady);
  onDocumentReadyRef.current = onDocumentReady;

  useEffect(() => {
    if (!mountNode) return;
    // Clean up previous listeners before re-binding.
    if (typeof cleanupRef.current === "function") {
      cleanupRef.current();
    }
    cleanupRef.current = onDocumentReady?.(mountNode);
    return () => {
      if (typeof cleanupRef.current === "function") {
        cleanupRef.current();
        cleanupRef.current = undefined;
      }
    };
  }, [mountNode, onDocumentReady]);

  return (
    <iframe
      ref={iframeRef}
      title="Responsive preview"
      className={`no-scrollbar absolute top-0 left-0 origin-top-left overflow-y-auto overflow-x-hidden border border-border bg-background shadow-lift ${isDragging ? "" : "transition-transform duration-200"
        }`}
      style={{
        width,
        height,
        transform: `scale(${scale})`,
        border: "none",
        // Crossing over an <iframe> mid-drag hands mouse events to its own
        // document, so the outer window's mousemove listener stops
        // receiving updates. Disabling pointer events during the drag keeps
        // every mousemove targeted at the host document.
        pointerEvents: isDragging ? "none" : "auto",
      }}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
}

export default PreviewIframe;
