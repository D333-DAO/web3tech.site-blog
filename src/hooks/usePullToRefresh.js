import { useState, useEffect, useRef } from "react";

export function usePullToRefresh(onRefresh) {
  const [pulling, setPulling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(null);
  const THRESHOLD = 70;

  useEffect(() => {
    const onTouchStart = (e) => {
      if (window.scrollY === 0) {
        startY.current = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e) => {
      if (startY.current === null) return;
      const delta = e.touches[0].clientY - startY.current;
      if (delta > 10 && window.scrollY === 0) {
        setPulling(delta > THRESHOLD);
      }
    };

    const onTouchEnd = async () => {
      if (pulling) {
        setRefreshing(true);
        setPulling(false);
        await onRefresh();
        setRefreshing(false);
      }
      startY.current = null;
      setPulling(false);
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd);

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [pulling, onRefresh]);

  return { pulling, refreshing };
}