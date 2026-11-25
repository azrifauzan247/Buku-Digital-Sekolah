import { programme, school } from "@/data/programme";
import { cn, pad2 } from "@/lib/book";

/** Hiasan sudut emas. */
export function Corners({ inset = 14, size = 30, opacity = 1 }: { inset?: number; size?: number; opacity?: number }) {
  const pos = [
    { top: inset, left: inset, rot: 0 },
    { top: inset, right: inset, rot: 90 },
    { bottom: inset, right: inset, rot: 180 },
    { bottom: inset, left: inset, rot: 270 },
  ];
  return (
    <>
      {pos.map(({ rot, ...p }) => (
        <img
          key={rot}
          src={programme.ornament}
          alt=""
          aria-hidden
          draggable={false}
          className="pointer-events-none absolute select-none"
          style={{ ...p, width: size, height: size, transform: `rotate(${rot}deg)`, opacity }}
        />
      ))}
    </>
  );
}

/** Halaman kertas standard: bingkai, tajuk berjalan & nombor halaman. */
export function PaperPage({ number, children, className }: { number: number; children: React.ReactNode; className?: string }) {
  const isLeft = number % 2 === 0;
  return (
    <div className="paper relative h-full w-full text-navy">
      <div className="pointer-events-none absolute inset-[10px] border border-gold/60" />
      <div className="pointer-events-none absolute inset-[13px] border border-gold/25" />
      <Corners inset={8} size={34} />

      <div className="absolute inset-x-0 top-[19px] flex items-center justify-center gap-2 text-[6.2px] font-medium uppercase tracking-[0.32em] text-gold-deep">
        <span className="h-px w-6 bg-gold/60" />
        {programme.fullTitle}
        <span className="h-px w-6 bg-gold/60" />
      </div>

      <div className={cn("absolute inset-x-[28px] top-[36px] bottom-[34px]", className)}>{children}</div>

      <div
        className={cn(
          "absolute bottom-[17px] flex items-center gap-2 text-[6.5px] uppercase tracking-[0.25em] text-navy/50",
          isLeft ? "left-[30px]" : "right-[30px] flex-row-reverse",
        )}
      >
        <span className="font-display text-[10px] font-semibold tracking-normal text-gold-deep">{pad2(number)}</span>
        <span className="h-px w-4 bg-gold/60" />
        <span>{school.shortName}</span>
      </div>
    </div>
  );
}

export function Kicker({ children, className, light }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-[7px] font-semibold uppercase tracking-[0.3em]",
        light ? "text-gold-light" : "text-gold-deep",
        className,
      )}
    >
      <Diamond />
      {children}
    </div>
  );
}

export function Heading({ children, className, size = 21 }: { children: React.ReactNode; className?: string; size?: number }) {
  return (
    <h2 className={cn("font-display font-bold leading-[1.12] text-navy", className)} style={{ fontSize: size }}>
      {children}
    </h2>
  );
}

export function Diamond({ className }: { className?: string }) {
  return <span className={cn("inline-block h-[5px] w-[5px] rotate-45 bg-gold", className)} aria-hidden />;
}

export function Flourish({ className, width = 90 }: { className?: string; width?: number }) {
  return (
    <svg viewBox="0 0 120 12" width={width} className={className} aria-hidden>
      <path d="M2 6 H48 M72 6 H118" stroke="#D9B45B" strokeWidth="0.8" />
      <path d="M60 1 L65 6 L60 11 L55 6 Z" fill="#D9B45B" />
      <circle cx="50" cy="6" r="1.4" fill="#D9B45B" />
      <circle cx="70" cy="6" r="1.4" fill="#D9B45B" />
    </svg>
  );
}

export function DemoTag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-gold/50 bg-gold/10 px-2 py-[2px] text-[6.5px] font-medium uppercase tracking-[0.12em] text-gold-deep",
        className,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-gold-deep" />
      {children}
    </span>
  );
}

/** Bingkai foto melengkung ala editorial. */
export function ArchPhoto({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute -inset-[4px] rounded-t-full border border-gold/70" />
      <div className="relative h-full w-full overflow-hidden rounded-t-full bg-softgrey shadow-[0_8px_18px_-8px_rgba(16,36,71,0.5)]">
        <img src={src} alt={alt} draggable={false} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
