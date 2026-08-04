import { useState, useEffect, useRef } from "react";

export function useTypewriter(text: string, speed = 28, active = false) {
    const [displayed, setDisplayed] = useState("");
    const idx = useRef(0);
  
    useEffect(() => {
      if (!active) {
        setDisplayed("");
        idx.current = 0;
        return;
      }
  
      const interval = setInterval(() => {
        if (idx.current < text.length) {
          setDisplayed(text.slice(0, idx.current + 1));
          idx.current++;
        } else {
          clearInterval(interval);
        }
      }, speed);
  
      return () => clearInterval(interval);
    }, [text, speed, active]);
  
    return displayed;
  }