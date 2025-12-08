// src/hooks/useSmoothScroll.js
import { useRef, useEffect } from "react";

/**
 * Custom hook for smooth, inertia-style scrolling
 * Requirement #12: Implement smooth, inertia-style scrolling for track list
 */
export const useSmoothScroll = (options = {}) => {
  const scrollRef = useRef(null);
  const momentumRef = useRef({
    isScrolling: false,
    startY: 0,
    lastY: 0,
    velocityY: 0,
    timestamp: 0,
  });
  const rafRef = useRef(null);

  const {
    friction = 0.92, // Higher = more slide (0.9-0.99)
    minVelocity = 0.5, // Minimum velocity to trigger momentum
    touchMultiplier = 2, // Touch scroll sensitivity
    wheelMultiplier = 1, // Mouse wheel sensitivity
  } = options;

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let isPointerDown = false;
    let startX = 0;
    let startY = 0;
    let startScrollTop = 0;
    let startScrollLeft = 0;
    let lastY = 0;
    let lastTimestamp = Date.now();

    // Apply momentum scrolling
    const applyMomentum = () => {
      if (Math.abs(momentumRef.current.velocityY) < minVelocity) {
        momentumRef.current.isScrolling = false;
        return;
      }

      container.scrollTop -= momentumRef.current.velocityY;
      momentumRef.current.velocityY *= friction;

      rafRef.current = requestAnimationFrame(applyMomentum);
    };

    // Mouse/Touch down
    const handlePointerDown = (e) => {
      isPointerDown = true;
      momentumRef.current.isScrolling = false;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      startX = e.type === "mousedown" ? e.pageX : e.touches[0].pageX;
      startY = e.type === "mousedown" ? e.pageY : e.touches[0].pageY;
      startScrollTop = container.scrollTop;
      startScrollLeft = container.scrollLeft;
      lastY = startY;
      lastTimestamp = Date.now();

      container.style.cursor = "grabbing";
      container.style.userSelect = "none";
    };

    // Mouse/Touch move
    const handlePointerMove = (e) => {
      if (!isPointerDown) return;

      e.preventDefault();
      const currentY = e.type === "mousemove" ? e.pageY : e.touches[0].pageY;
      const currentX = e.type === "mousemove" ? e.pageX : e.touches[0].pageX;

      const deltaY = currentY - startY;
      const deltaX = currentX - startX;

      container.scrollTop = startScrollTop - deltaY;
      container.scrollLeft = startScrollLeft - deltaX;

      // Calculate velocity
      const now = Date.now();
      const timeDelta = now - lastTimestamp;

      if (timeDelta > 0) {
        momentumRef.current.velocityY =
          ((currentY - lastY) / timeDelta) * 16 * touchMultiplier;
      }

      lastY = currentY;
      lastTimestamp = now;
    };

    // Mouse/Touch up
    const handlePointerUp = () => {
      if (!isPointerDown) return;

      isPointerDown = false;
      container.style.cursor = "grab";
      container.style.userSelect = "";

      // Start momentum scrolling if velocity is high enough
      if (Math.abs(momentumRef.current.velocityY) > minVelocity) {
        momentumRef.current.isScrolling = true;
        rafRef.current = requestAnimationFrame(applyMomentum);
      }
    };

    // Mouse wheel
    const handleWheel = (e) => {
      e.preventDefault();

      // Cancel any ongoing momentum
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      momentumRef.current.isScrolling = false;

      // Smooth scroll
      const delta = e.deltaY * wheelMultiplier;
      container.scrollTop += delta;

      // Set velocity for potential momentum
      momentumRef.current.velocityY = delta * 0.3;
    };

    // Add event listeners
    container.addEventListener("mousedown", handlePointerDown);
    container.addEventListener("touchstart", handlePointerDown, {
      passive: false,
    });
    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("touchmove", handlePointerMove, {
      passive: false,
    });
    container.addEventListener("mouseup", handlePointerUp);
    container.addEventListener("touchend", handlePointerUp);
    container.addEventListener("mouseleave", handlePointerUp);
    container.addEventListener("wheel", handleWheel, { passive: false });

    // Set initial cursor
    container.style.cursor = "grab";
    container.style.scrollBehavior = "auto"; // Disable native smooth scroll

    // Cleanup
    return () => {
      container.removeEventListener("mousedown", handlePointerDown);
      container.removeEventListener("touchstart", handlePointerDown);
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("touchmove", handlePointerMove);
      container.removeEventListener("mouseup", handlePointerUp);
      container.removeEventListener("touchend", handlePointerUp);
      container.removeEventListener("mouseleave", handlePointerUp);
      container.removeEventListener("wheel", handleWheel);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [friction, minVelocity, touchMultiplier, wheelMultiplier]);

  return scrollRef;
};

/**
 * Simpler version - just smooth scrolling without momentum
 */
export const useSmoothScrollSimple = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Add smooth scrolling behavior
    container.style.scrollBehavior = "smooth";
    container.style.overflowY = "auto";

    // Optional: hide scrollbar
    container.style.scrollbarWidth = "thin";
    container.style.scrollbarColor = "#a855f7 #1f2937";

    return () => {
      container.style.scrollBehavior = "auto";
    };
  }, []);

  // Scroll to specific position
  const scrollTo = (position) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: position,
        behavior: "smooth",
      });
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    scrollTo(0);
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollTo(scrollRef.current.scrollHeight);
    }
  };

  // Scroll element into view
  const scrollIntoView = (elementId) => {
    if (scrollRef.current) {
      const element = scrollRef.current.querySelector(`#${elementId}`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  };

  return {
    scrollRef,
    scrollTo,
    scrollToTop,
    scrollToBottom,
    scrollIntoView,
  };
};

export default useSmoothScroll;
