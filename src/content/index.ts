import { bg } from "./bg";
import { en } from "./en";
import { pagesBg } from "./pages-bg";
import { pagesEn } from "./pages-en";
import type { Dictionary, Lang } from "./types";
import type { PagesDict } from "./pages-types";

export const dictionaries: Record<Lang, Dictionary> = { bg, en };

export function getDictionary(lang: string): Dictionary {
  return lang === "bg" ? bg : en;
}

export function getPages(lang: string): PagesDict {
  return lang === "bg" ? pagesBg : pagesEn;
}

export const LANGS: Lang[] = ["en", "bg"];

export type { Dictionary, Lang, PagesDict };
