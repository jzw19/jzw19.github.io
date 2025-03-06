import React, { useLayoutEffect, useState } from "react";

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([
        window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth,
        window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight,
      ]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
