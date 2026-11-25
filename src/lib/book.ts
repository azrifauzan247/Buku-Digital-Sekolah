/** Saiz asas reka letak halaman (px). Kandungan diskala mengikut saiz skrin. */
export const BASE_PAGE_WIDTH = 360;
export const BASE_PAGE_HEIGHT = 512;
export const PAGE_RATIO = BASE_PAGE_HEIGHT / BASE_PAGE_WIDTH;

export const pad2 = (n: number) => String(n).padStart(2, "0");

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Simpan/baca keadaan sesi dengan selamat (mod peribadi mungkin menyekat). */
export function sessionGet(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}
export function sessionSet(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    /* abaikan */
  }
}
