import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";

import App from "./App";
import "./styles.css";

const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element #root was not found");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);