"use client";

import { useCallback, useEffect, useState } from "react";

type FsDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void>;
};
type FsElement = HTMLElement & { webkitRequestFullscreen?: () => Promise<void> };

/**
 * Mod skrin penuh. Jika pelayar tidak menyokong Fullscreen API (cth. iPhone Safari),
 * mod "bacaan fokus" digunakan — bar atas disembunyikan untuk ruang bacaan maksimum.
 */
export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const doc = document as FsDocument;
    const el = document.documentElement as FsElement;
    setSupported(Boolean(el.requestFullscreen || el.webkitRequestFullscreen));
    const onChange = () => setIsFullscreen(Boolean(doc.fullscreenElement || doc.webkitFullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  const toggle = useCallback(async () => {
    const doc = document as FsDocument;
    const el = document.documentElement as FsElement;
    if (!supported) {
      setIsFullscreen((v) => !v);
      return;
    }
    try {
      if (doc.fullscreenElement || doc.webkitFullscreenElement) {
        await (doc.exitFullscreen?.() ?? doc.webkitExitFullscreen?.());
      } else {
        await (el.requestFullscreen?.() ?? el.webkitRequestFullscreen?.());
      }
    } catch {
      setIsFullscreen((v) => !v);
    }
  }, [supported]);

  return { isFullscreen, toggle };
}
