"use client";

import { forwardRef } from "react";
import { BASE_PAGE_HEIGHT, BASE_PAGE_WIDTH, cn } from "@/lib/book";

type Props = {
  density?: "soft" | "hard";
  children: React.ReactNode;
  className?: string;
};

/**
 * Bekas satu helaian untuk StPageFlip. Kandungan direka pada saiz asas
 * (360×512) dan diskala melalui pemboleh ubah CSS --page-scale supaya
 * komposisi kekal sama pada semua saiz skrin.
 */
export const BookPage = forwardRef<HTMLDivElement, Props>(function BookPage(
  { density = "soft", children, className },
  ref,
) {
  return (
    <div ref={ref} className={cn("book-page", className)} data-density={density}>
      <div className="page-canvas" style={{ width: BASE_PAGE_WIDTH, height: BASE_PAGE_HEIGHT }}>
        {children}
      </div>
    </div>
  );
});
