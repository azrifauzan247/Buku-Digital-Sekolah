"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { assets } from "@/data/programme";
import { sessionGet, sessionSet } from "@/lib/book";

type AudioState = {
  /** Muzik sedang dimainkan (dan tidak disenyapkan). */
  isPlaying: boolean;
  muted: boolean;
  volume: number;
  /** false jika fail muzik tiada / gagal dimuatkan. */
  available: boolean;
  sfxEnabled: boolean;
  /** Cuba autoplay. Pulangkan true jika berjaya (atau pengguna telah senyapkan). */
  tryAutoplay: () => Promise<boolean>;
  /** Mula muzik daripada interaksi pengguna. */
  start: () => Promise<void>;
  toggleMute: () => void;
  setVolume: (v: number) => void;
  setSfxEnabled: (v: boolean) => void;
  playFlip: () => void;
};

const AudioContext = createContext<AudioState | null>(null);

const KEY_MUTED = "bukuprogram:muted";
const KEY_VOLUME = "bukuprogram:volume";
const KEY_SFX = "bukuprogram:sfx";
const DEFAULT_VOLUME = 0.45;

export function AudioProvider({ children }: { children: React.ReactNode }) {
  // Satu elemen audio sahaja untuk keseluruhan sesi — muzik tidak bermula semula ketika menyelak.
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const flipRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);

  const [muted, setMuted] = useState(false);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [available, setAvailable] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sfxEnabled, setSfxState] = useState(true);

  const mutedRef = useRef(muted);
  const volumeRef = useRef(volume);
  const sfxRef = useRef(sfxEnabled);
  mutedRef.current = muted;
  volumeRef.current = volume;
  sfxRef.current = sfxEnabled;

  useEffect(() => {
    const storedMuted = sessionGet(KEY_MUTED) === "1";
    const storedVol = parseFloat(sessionGet(KEY_VOLUME) ?? "");
    const storedSfx = sessionGet(KEY_SFX);
    const vol = Number.isFinite(storedVol) ? Math.min(1, Math.max(0, storedVol)) : DEFAULT_VOLUME;
    setMuted(storedMuted);
    setVolumeState(vol);
    if (storedSfx !== null) setSfxState(storedSfx === "1");
    mutedRef.current = storedMuted;
    volumeRef.current = vol;

    const music = new Audio();
    music.src = assets.music;
    music.loop = true;
    music.preload = "auto";
    music.volume = vol;
    music.muted = storedMuted;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => {
      setAvailable(false);
      setIsPlaying(false);
    };
    music.addEventListener("playing", onPlay);
    music.addEventListener("pause", onPause);
    music.addEventListener("error", onError);
    musicRef.current = music;

    const flip = new Audio();
    flip.src = assets.flipSound;
    flip.preload = "auto";
    flip.volume = 0.55;
    flip.addEventListener("error", () => (flipRef.current = null));
    flipRef.current = flip;

    return () => {
      music.pause();
      music.removeEventListener("playing", onPlay);
      music.removeEventListener("pause", onPause);
      music.removeEventListener("error", onError);
      music.src = "";
      musicRef.current = null;
      flipRef.current = null;
    };
  }, []);

  const fadeTo = useCallback((target: number, ms = 1400) => {
    const music = musicRef.current;
    if (!music) return;
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    const from = music.volume;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      music.volume = from + (target - from) * k;
      if (k < 1) fadeRef.current = requestAnimationFrame(step);
    };
    fadeRef.current = requestAnimationFrame(step);
  }, []);

  const playMusic = useCallback(async () => {
    const music = musicRef.current;
    if (!music) throw new Error("no-audio");
    if (!music.paused) return;
    music.volume = 0;
    await music.play();
    fadeTo(volumeRef.current);
  }, [fadeTo]);

  const tryAutoplay = useCallback(async () => {
    if (mutedRef.current) return true; // pengguna memilih senyap dalam sesi ini
    try {
      await playMusic();
      return true;
    } catch {
      return false;
    }
  }, [playMusic]);

  const start = useCallback(async () => {
    if (mutedRef.current) return;
    try {
      await playMusic();
    } catch {
      /* fail tiada atau disekat — kawalan kekal tersedia */
    }
  }, [playMusic]);

  const toggleMute = useCallback(() => {
    const music = musicRef.current;
    const next = !mutedRef.current;
    setMuted(next);
    mutedRef.current = next;
    sessionSet(KEY_MUTED, next ? "1" : "0");
    if (!music) return;
    music.muted = next;
    if (!next && music.paused) {
      music.volume = 0;
      music.play().then(() => fadeTo(volumeRef.current)).catch(() => undefined);
    }
  }, [fadeTo]);

  const setVolume = useCallback((v: number) => {
    const vol = Math.min(1, Math.max(0, v));
    setVolumeState(vol);
    volumeRef.current = vol;
    sessionSet(KEY_VOLUME, String(vol));
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    if (musicRef.current) musicRef.current.volume = vol;
  }, []);

  const setSfxEnabled = useCallback((v: boolean) => {
    setSfxState(v);
    sessionSet(KEY_SFX, v ? "1" : "0");
  }, []);

  const playFlip = useCallback(() => {
    const flip = flipRef.current;
    if (!flip || !sfxRef.current || mutedRef.current) return;
    try {
      flip.currentTime = 0;
      flip.play().catch(() => undefined);
    } catch {
      /* abaikan */
    }
  }, []);

  const value = useMemo<AudioState>(
    () => ({
      isPlaying: isPlaying && !muted,
      muted,
      volume,
      available,
      sfxEnabled,
      tryAutoplay,
      start,
      toggleMute,
      setVolume,
      setSfxEnabled,
      playFlip,
    }),
    [isPlaying, muted, volume, available, sfxEnabled, tryAutoplay, start, toggleMute, setVolume, setSfxEnabled, playFlip],
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio mesti digunakan dalam <AudioProvider>");
  return ctx;
}
