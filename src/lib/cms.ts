import { readdirSync, readFileSync } from "fs";
import path from "path";

/* ============================================================
   CMS content loader.
   Content lives in /content as JSON files editable via Decap CMS
   (/admin → /cms). Post bodies are a markdown subset parsed here
   into typed blocks so the site keeps full typographic control.
   ============================================================ */

export type PostBlock =
  | { t: "p"; c: string }
  | { t: "h2"; c: string }
  | { t: "ul"; c: string[] }
  | { t: "quote"; c: string };

export interface PostLocale {
  title: string;
  excerpt: string;
  body: PostBlock[];
}

export interface Post {
  slug: string;
  date: string;
  category: "operations" | "cargo" | "customs" | "ports";
  cover: string;
  minutes: number;
  bg: PostLocale;
  en: PostLocale;
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

/** Markdown subset → blocks: "## " heading, "- " list, "> " quote, else paragraph. */
export function mdToBlocks(md: string): PostBlock[] {
  const blocks: PostBlock[] = [];
  let list: string[] | null = null;
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) {
      blocks.push({ t: "p", c: para.join(" ").trim() });
      para = [];
    }
  };
  const flushList = () => {
    if (list?.length) blocks.push({ t: "ul", c: list });
    list = null;
  };

  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      flushList();
      continue;
    }
    if (line.startsWith("## ")) {
      flushPara();
      flushList();
      blocks.push({ t: "h2", c: line.slice(3).trim() });
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      flushPara();
      list = list ?? [];
      list.push(line.slice(2).trim());
    } else if (line.startsWith("> ")) {
      flushPara();
      flushList();
      blocks.push({ t: "quote", c: line.slice(2).trim() });
    } else {
      flushList();
      para.push(line);
    }
  }
  flushPara();
  flushList();
  return blocks;
}

interface RawPost {
  slug: string;
  date: string;
  category: Post["category"];
  cover: string;
  minutes: number;
  title_bg: string;
  excerpt_bg: string;
  body_bg: string;
  title_en: string;
  excerpt_en: string;
  body_en: string;
}

function toPost(raw: RawPost): Post {
  return {
    slug: raw.slug,
    date: raw.date.slice(0, 10),
    category: raw.category,
    cover: raw.cover,
    minutes: raw.minutes,
    bg: { title: raw.title_bg, excerpt: raw.excerpt_bg, body: mdToBlocks(raw.body_bg) },
    en: { title: raw.title_en, excerpt: raw.excerpt_en, body: mdToBlocks(raw.body_en) },
  };
}

export function getAllPosts(): Post[] {
  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith(".json"));
  const items = files.map((f) => {
    const raw = JSON.parse(readFileSync(path.join(POSTS_DIR, f), "utf-8")) as RawPost;
    // Filename wins over the slug field so renames in the CMS stay consistent.
    return toPost({ ...raw, slug: raw.slug || f.replace(/\.json$/, "") });
  });
  return items.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
