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
  const copiedNodes = useRef<Set<Node>>(new Set());

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    function copyHeadAssets() {
      const doc = iframe?.contentDocument;
      if (!doc) return;
      // Clone every <link rel="stylesheet"> and <style> tag from the host
      // document into the iframe so Tailwind's compiled CSS (and any
      // inline <style> blocks) is available inside the iframe's document too.
      document
        .querySelectorAll('link[rel="stylesheet"], style')
        .forEach((node) => {
          if (copiedNodes.current.has(node)) return;
          copiedNodes.current.add(node);
          doc.head.appendChild(node.cloneNode(true));
        });
      // Keep theme/dark-mode classes on <html> (e.g. class="dark") in sync,
      // since CSS variables driving your theme are usually scoped to :root/html.
      doc.documentElement.className = document.documentElement.className;
    }

    function handleLoad() {
      const doc = iframe?.contentDocument;
      if (!doc) return;
      doc.body.style.margin = "0";
      doc.body.style.minHeight = "100%";
      doc.documentElement.style.minHeight = "100%";
      copyHeadAssets();

      // Hide the iframe's own native scrollbar — otherwise it eats ~15px
      // of the simulated device width and shows a mismatched gray bar that
      // doesn't look anything like real mobile device chrome.
      if (!doc.getElementById("preview-iframe-scrollbar-reset")) {
        const style = doc.createElement("style");
        style.id = "preview-iframe-scrollbar-reset";
        style.textContent = `
          html, body {
            scrollbar-width: none;
            -ms-overflow-style: none;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            min-height: 100%;
            scroll-behavior: smooth;
          }
          html::-webkit-scrollbar, body::-webkit-scrollbar { display: none; width: 0; height: 0; }
          .preview-edit-canvas.edit-active [data-preview-edit-id] {
            cursor: pointer;
          }
          .preview-edit-canvas.move-active [data-preview-edit-id] {
            cursor: move;
          }
          .preview-edit-canvas.edit-active .preview-edit-hovered:not(.preview-edit-selected) {
            outline: 2px dashed var(--preview-editor-accent, #10b981) !important;
            outline-offset: 3px !important;
            cursor: pointer !important;
            transition: outline 0.12s ease;
          }
          .preview-edit-canvas.edit-active .preview-edit-selected,
          .preview-edit-selected {
            outline: 2px solid var(--preview-editor-accent, #10b981) !important;
            outline-offset: 3px !important;
            box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.22), 0 8px 24px rgba(0,0,0,0.18) !important;
            transform: scale(1.02) !important;
            z-index: 35 !important;
            position: relative !important;
            transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), outline 0.15s ease, box-shadow 0.18s ease !important;
          }
          .preview-hover-lift:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 12px 24px -6px rgba(0,0,0,0.2) !important;
            transition: transform 0.2s ease, box-shadow 0.2s ease !important;
          }
        `;
        doc.head.appendChild(style);
      }

      setMountNode(doc.body);
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

    return () => {
      iframe.removeEventListener("load", handleLoad);
      observer.disconnect();
    };
  }, [iframeRef]);

  // Re-run whenever onDocumentReady changes (its deps include editMode, blocks,
  // site, device etc.). This replaces stale event-listener closures — e.g. the
  // one that had editMode=false before the user toggled edit mode on.
  const cleanupRef = useRef<(() => void) | void>(undefined);
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
      className={`no-scrollbar absolute top-0 left-0 origin-top-left overflow-y-auto overflow-x-hidden border border-border bg-background shadow-lift ${
        isDragging ? "" : "transition-transform duration-200"
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
