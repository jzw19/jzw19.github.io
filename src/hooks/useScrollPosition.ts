/*
    Credit: https://www.codemzy.com/blog/react-hook-scroll-direction-event-listener
*/

import { useEffect, useState } from "react";

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    // function to run on scroll
    const updateScrollPosition = (event: Event) => {
      event.preventDefault();
      const scrollY = window.pageYOffset;
      if (Math.abs(scrollY - lastScrollY) > 5) {
        // run when scroll position changes significantly
        setScrollPosition(scrollY);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollPosition); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollPosition); // clean up
    };
  }, [scrollPosition]);

  return scrollPosition;
}
