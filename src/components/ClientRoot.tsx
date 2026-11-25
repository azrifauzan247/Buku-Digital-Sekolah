"use client";

import dynamic from "next/dynamic";

// Flipbook bergantung pada DOM pelayar — dimuat di sisi klien sahaja.
const BookExperience = dynamic(() => import("./BookExperience"), {
  ssr: false,
  loading: () => <div className="reading-desk fixed inset-0" />,
});

export default function ClientRoot() {
  return <BookExperience />;
}
