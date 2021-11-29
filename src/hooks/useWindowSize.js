import { useState, useCallback, useEffect } from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" && window.innerWidth,
    height: typeof window !== "undefined" && window.innerHeight,
  });

  const handleSizeUpdate = useCallback(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("resize", handleSizeUpdate);

    return () => {
      window.removeEventListener("resize", handleSizeUpdate);
    };
  }, [handleSizeUpdate]);

  return windowSize;
}
