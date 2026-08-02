import { RefObject, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function PreviewIframe({
  width,
  height,
  scale,
  isDragging,
  iframeRef,
  children,
}: {
  width: number;
  height: number;
  scale: number;
  isDragging: boolean;
  iframeRef: RefObject<HTMLIFrameElement | null>;
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
      doc.body.style.height = "100%";
      doc.documentElement.style.height = "100%";
      copyHeadAssets();

      // Hide the iframe's own native scrollbar — otherwise it eats ~15px
      // of the simulated device width and shows a mismatched gray bar that
      // doesn't look anything like real mobile device chrome.
      if (!doc.getElementById("preview-iframe-scrollbar-reset")) {
        const style = doc.createElement("style");
        style.id = "preview-iframe-scrollbar-reset";
        style.textContent = `
          html, body { scrollbar-width: none; -ms-overflow-style: none; }
          html::-webkit-scrollbar, body::-webkit-scrollbar { display: none; width: 0; height: 0; }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iframeRef.current]);

  // Click-and-hold-drag panning, like Chrome DevTools' device toolbar: hold
  // the mouse down and move it to scroll the frame, the way you'd drag a
  // finger on a real phone. Only kicks in past a small movement threshold,
  // so a plain click (e.g. tapping a hamburger button) still reaches the
  // real element untouched.
  useEffect(() => {
    const iframe = iframeRef.current;
    const doc = iframe?.contentDocument;
    const win = iframe?.contentWindow;
    if (!doc || !win || !mountNode) return;

    const DRAG_THRESHOLD = 4;
    let isPanning = false;
    let moved = false;
    let startX = 0;
    let startY = 0;
    let startScrollX = 0;
    let startScrollY = 0;

    function onMouseDown(e: MouseEvent) {
      if (e.button !== 0) return;
      const target = e.target as HTMLElement;
      // Don't hijack native drag/selection inside real form controls.
      if (target.closest("input, textarea, select, [contenteditable='true']")) return;
      isPanning = true;
      moved = false;
      startX = e.clientX;
      startY = e.clientY;
      startScrollX = win!.scrollX;
      startScrollY = win!.scrollY;
    }

    function onMouseMove(e: MouseEvent) {
      if (!isPanning) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
        moved = true;
        doc!.body.style.userSelect = "none";
        doc!.body.style.cursor = "grabbing";
      }
      if (moved) {
        win!.scrollTo({ left: startScrollX - dx, top: startScrollY - dy });
      }
    }

    function onMouseUp() {
      if (moved) {
        // A drag-release shouldn't also fire a click on whatever's under
        // the cursor — swallow just that one trailing click.
        const suppressClick = (ev: MouseEvent) => {
          ev.stopPropagation();
          ev.preventDefault();
          doc!.removeEventListener("click", suppressClick, true);
        };
        doc!.addEventListener("click", suppressClick, true);
      }
      isPanning = false;
      moved = false;
      doc!.body.style.userSelect = "";
      doc!.body.style.cursor = "";
    }

    doc.addEventListener("mousedown", onMouseDown);
    doc.addEventListener("mousemove", onMouseMove);
    doc.addEventListener("mouseup", onMouseUp);
    doc.addEventListener("mouseleave", onMouseUp);

    return () => {
      doc.removeEventListener("mousedown", onMouseDown);
      doc.removeEventListener("mousemove", onMouseMove);
      doc.removeEventListener("mouseup", onMouseUp);
      doc.removeEventListener("mouseleave", onMouseUp);
    };
  }, [mountNode, iframeRef]);

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