"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MousePointerClick, Hand } from "lucide-react";
import { AudioProvider, useAudio } from "@/components/audio/AudioProvider";
import { BookUIContext } from "@/components/book/BookUIContext";
import { FlipBook, type FlipBookHandle } from "@/components/book/FlipBook";
import { ControlBar } from "@/components/controls/ControlBar";
import { TableOfContents } from "@/components/controls/TableOfContents";
import { Lightbox } from "@/components/layout/Lightbox";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { ReaderModal } from "@/components/layout/ReaderModal";
import { TopBar } from "@/components/layout/TopBar";
import { WelcomeOverlay } from "@/components/layout/WelcomeOverlay";
import { administration, gallery, pages, principalMessage, programme, pibgMessage, school, ui } from "@/data/programme";
import { useBookSize } from "@/hooks/useBookSize";
import { useFullscreen } from "@/hooks/useFullscreen";

type Phase = "loading" | "welcome" | "reading";

const PRELOAD = Array.from(
  new Set([
    school.logo,
    programme.heroImage,
    programme.ornament,
    principalMessage.person.photo,
    pibgMessage.person.photo,
    ...administration.people.map((p) => p.photo ?? ""),
    ...gallery.items.map((g) => g.src),
  ]),
).filter(Boolean);

export default function BookExperience() {
  return (
    <AudioProvider>
      <Experience />
    </AudioProvider>
  );
}

function Experience() {
  const audio = useAudio();
  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen();
  const size = useBookSize(isFullscreen);
  const bookRef = useRef<FlipBookHandle>(null);

  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const [tocOpen, setTocOpen] = useState(false);
  const [readerOpen, setReaderOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [hint, setHint] = useState(true);

  /* ---------------- Memuatkan aset ---------------- */
  useEffect(() => {
    let cancelled = false;
    let done = 0;
    const total = PRELOAD.length + 1;
    const tick = () => !cancelled && setProgress(++done / total);
    const images = PRELOAD.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = img.onerror = () => {
            tick();
            resolve();
          };
          img.src = src;
        }),
    );
    const fonts = (document.fonts?.ready ?? Promise.resolve()).then(tick);
    const minDelay = new Promise((r) => setTimeout(r, 1300));
    Promise.all([...images, fonts, minDelay]).then(async () => {
      if (cancelled) return;
      const ok = await audio.tryAutoplay();
      if (cancelled) return;
      setPhase(ok ? "reading" : "welcome");
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStart = useCallback(
    (withMusic: boolean) => {
      if (withMusic) audio.start();
      else if (!audio.muted) audio.toggleMute();
      window.setTimeout(() => setPhase("reading"), 350);
    },
    [audio],
  );

  /* ---------------- Navigasi ---------------- */
  const onPageChange = useCallback((i: number) => {
    currentRef.current = i;
    setCurrent(i);
    setHint(false);
  }, []);
  const { playFlip } = audio;
  const onFlipStart = useCallback(() => playFlip(), [playFlip]);

  const next = useCallback(() => bookRef.current?.next(), []);
  const prev = useCallback(() => bookRef.current?.prev(), []);
  const goTo = useCallback((i: number) => bookRef.current?.goTo(i), []);
  const home = useCallback(() => bookRef.current?.goTo(0), []);

  const modalOpen = tocOpen || readerOpen || lightbox !== null;

  useEffect(() => {
    if (phase !== "reading" || modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") home();
      else if (e.key === "End") goTo(pages.length - 1);
      else if (e.key.toLowerCase() === "f") toggleFullscreen();
      else if (e.key.toLowerCase() === "m") audio.toggleMute();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, modalOpen, next, prev, home, goTo, toggleFullscreen, audio]);

  useEffect(() => {
    if (phase !== "reading") return;
    const t = window.setTimeout(() => setHint(false), 9000);
    return () => window.clearTimeout(t);
  }, [phase]);

  const bookUI = useMemo(() => ({ openLightbox: (i: number) => setLightbox(i) }), []);
  const closeToc = useCallback(() => setTocOpen(false), []);
  const closeReader = useCallback(() => setReaderOpen(false), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  // Buku dimuat semula hanya apabila mod paparan / saiz berubah; halaman semasa dikekalkan.
  const bookKey = `${size.spread ? "s" : "p"}-${size.pageWidth}`;
  const compact = size.isMobile;

  return (
    <BookUIContext.Provider value={bookUI}>
      <main className="reading-desk fixed inset-0 overflow-hidden select-none">
        <GoldDust />

        {phase === "loading" && <LoadingScreen progress={progress} />}
        {phase === "welcome" && <WelcomeOverlay onStart={handleStart} />}

        {phase !== "loading" && !isFullscreen && <TopBar compact={compact} />}

        {phase === "reading" && size.ready && (
          <>
            <div
              className="book-stage absolute inset-x-0 flex items-center justify-center"
              style={{ top: size.chromeTop, bottom: size.chromeBottom }}
            >
              <div className="book-enter">
                <FlipBook
                  key={bookKey}
                  ref={bookRef}
                  size={size}
                  current={current}
                  startPage={currentRef.current}
                  onPageChange={onPageChange}
                  onFlipStart={onFlipStart}
                />
              </div>
            </div>

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col items-center gap-2 px-2"
              style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
            >
              {hint && (
                <div className="fade-in hint-pulse flex items-center gap-2 rounded-full bg-black/35 px-3.5 py-1.5 text-[11.5px] text-ivory/90 backdrop-blur-sm">
                  {compact ? <Hand size={14} className="text-gold" /> : <MousePointerClick size={14} className="text-gold" />}
                  {compact ? ui.hintMobile : ui.hintDesktop}
                </div>
              )}
              <ControlBar
                current={current}
                spread={size.spread}
                compact={compact}
                isFullscreen={isFullscreen}
                onPrev={prev}
                onNext={next}
                onHome={home}
                onGoTo={goTo}
                onToggleToc={() => setTocOpen((v) => !v)}
                onZoom={() => setReaderOpen(true)}
                onToggleFullscreen={toggleFullscreen}
              />
            </div>
          </>
        )}

        <TableOfContents
          open={tocOpen}
          current={current}
          spread={size.spread}
          onClose={closeToc}
          onGoTo={goTo}
          onZoom={() => setReaderOpen(true)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
        <ReaderModal open={readerOpen} startIndex={current} onClose={closeReader} onNavigate={goTo} />
        <Lightbox index={lightbox} onClose={closeLightbox} onChange={setLightbox} />
      </main>
    </BookUIContext.Provider>
  );
}

/** Zarah emas halus di latar belakang (deterministik untuk elak ketidakpadanan). */
function GoldDust() {
  const specks = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const r = (n: number) => {
          const x = Math.sin((i + 1) * 9301 + n * 49297) * 233280;
          return x - Math.floor(x);
        };
        return { left: `${r(1) * 100}%`, size: 1.5 + r(2) * 2.5, duration: 14 + r(3) * 16, delay: -r(4) * 30 };
      }),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {specks.map((s, i) => (
        <span
          key={i}
          className="dust"
          style={{ left: s.left, bottom: -10, width: s.size, height: s.size, animationDuration: `${s.duration}s`, animationDelay: `${s.delay}s` }}
        />
      ))}
    </div>
  );
}
