"use client";

import { createContext, useContext } from "react";

export type BookUI = {
  openLightbox: (index: number) => void;
};

export const BookUIContext = createContext<BookUI>({ openLightbox: () => undefined });

export const useBookUI = () => useContext(BookUIContext);
