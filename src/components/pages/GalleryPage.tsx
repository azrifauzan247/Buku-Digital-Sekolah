"use client";

import { Expand } from "lucide-react";
import { gallery } from "@/data/programme";
import { useBookUI } from "@/components/book/BookUIContext";
import { cn } from "@/lib/book";
import { Heading, Kicker, PaperPage } from "./primitives";

export function GalleryPage({ number }: { number: number }) {
  const { openLightbox } = useBookUI();
  const [featured, ...rest] = gallery.items;
  return (
    <PaperPage number={number}>
      <div className="flex h-full flex-col">
        <div className="flex items-end justify-between">
          <div>
            <Kicker>{gallery.kicker}</Kicker>
            <Heading className="mt-1.5" size={23}>
              {gallery.heading}
            </Heading>
          </div>
          <span className="pb-1 text-[6.8px] uppercase tracking-[0.18em] text-navy/50">Ketik foto untuk besarkan</span>
        </div>

        <div className="mt-2.5 grid flex-1 grid-cols-3 grid-rows-4 gap-[6px]">
          <Tile index={0} item={featured} onOpen={openLightbox} className="col-span-2 row-span-2" big />
          {rest.map((item, i) => (
            <Tile key={item.src} index={i + 1} item={item} onOpen={openLightbox} className={i === 0 ? "row-span-2" : undefined} />
          ))}
        </div>
        <p className="mt-1.5 text-center text-[6.6px] italic text-navy/50">{gallery.note}</p>
      </div>
    </PaperPage>
  );
}

function Tile({
  item,
  index,
  onOpen,
  className,
  big,
}: {
  item: (typeof gallery.items)[number];
  index: number;
  onOpen: (i: number) => void;
  className?: string;
  big?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className={cn(
        "group relative overflow-hidden rounded-[2px] bg-softgrey p-0 shadow-[0_4px_10px_-5px_rgba(16,36,71,0.6)] outline-none ring-gold transition focus-visible:ring-2",
        className,
      )}
      aria-label={`Besarkan foto: ${item.caption}`}
    >
      <img src={item.src} alt={item.caption} draggable={false} className="pointer-events-none h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      <span className="pointer-events-none absolute inset-0 border-[2.5px] border-white/90" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent px-1.5 pt-3 pb-1 text-left">
        <span className={cn("block font-medium leading-tight text-ivory", big ? "text-[8.6px]" : "text-[6.6px]")}>{item.caption}</span>
      </span>
      <span className="pointer-events-none absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-navy/70 text-gold opacity-80">
        <Expand size={7} />
      </span>
    </button>
  );
}
