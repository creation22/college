"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

/** WebGL capability — detected once, after hydration (async callback keeps SSR markup stable). */
export function useWebGL() {
  const [supported, setSupported] = useState<boolean | null>(null);
  useEffect(() => {
    let active = true;
    const detect = () => {
      let ok = false;
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl");
        ok = !!gl;
      } catch {
        ok = false;
      }
      if (active) setSupported(ok);
    };
    const id = requestAnimationFrame(detect);
    return () => {
      active = false;
      cancelAnimationFrame(id);
    };
  }, []);
  return supported;
}

export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    [query]
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
export const useIsTouch = () => useMediaQuery("(pointer: coarse)");
