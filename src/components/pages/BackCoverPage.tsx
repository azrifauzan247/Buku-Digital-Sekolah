import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { DEMO_NOTICE, backCover, programme, school, ui } from "@/data/programme";
import { Corners, Flourish } from "./primitives";

export function BackCoverPage() {
  return (
    <div className="cover-surface relative h-full w-full overflow-hidden text-ivory">
      <div className="leather" />
      <div className="pointer-events-none absolute inset-[12px] border border-gold/70" />
      <div className="pointer-events-none absolute inset-[16px] border border-gold/30" />
      <Corners inset={10} size={40} />
      <div className="sheen" />

      <div className="relative flex h-full flex-col items-center px-[36px] pt-[46px] pb-[28px] text-center">
        <Flourish width={120} />
        <h2 className="gold-text mt-3 font-display text-[40px] font-bold italic leading-none">{backCover.heading}</h2>
        <p className="mt-3 text-[9.6px] leading-[1.7] text-ivory/85">{backCover.message}</p>
        <p className="mt-2 font-display text-[11px] italic text-gold-light">{backCover.closingLine}</p>

        <div className="mt-5 flex items-center gap-3">
          <span className="gold-rule w-10" />
          <img src={school.logo} alt={`Logo ${school.shortName}`} draggable={false} className="h-[62px] w-[62px]" />
          <span className="gold-rule w-10" />
        </div>
        <div className="mt-2 font-display text-[15px] font-semibold tracking-wide text-white">{school.fullName}</div>
        <div className="mt-0.5 text-[7px] uppercase tracking-[0.4em] text-gold-light">{school.motto}</div>

        <div className="mt-5 w-full space-y-[6px] rounded-md border border-gold/30 bg-white/[0.04] px-4 py-3 text-left text-[8px] text-ivory/85">
          <ContactRow icon={<MapPin size={10} />}>{school.address.join(" ")}</ContactRow>
          <ContactRow icon={<Phone size={10} />}>{school.phone}</ContactRow>
          <ContactRow icon={<Mail size={10} />}>{school.email}</ContactRow>
          <ContactRow icon={<Globe size={10} />}>{school.website}</ContactRow>
        </div>

        <div className="mt-auto text-[6.5px] uppercase tracking-[0.3em] text-ivory/55">{programme.fullTitle}</div>
        <div className="mt-1 text-[5.6px] tracking-[0.12em] text-ivory/40">{DEMO_NOTICE} {ui.musicCredit}</div>
      </div>
    </div>
  );
}

function ContactRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-[1px] text-gold">{icon}</span>
      <span className="leading-snug">{children}</span>
    </div>
  );
}
