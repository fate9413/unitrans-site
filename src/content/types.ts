export type Lang = "bg" | "en";

export interface HeroSlide {
  src: string;
  alt: string;
  caption: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
  plain?: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  short: string;
  points: string[];
  image: string;
  company: "unitrans" | "uniagent";
}

export interface PortInfo {
  id: string;
  name: string;
  type: "sea" | "river";
  desc: string;
  tags: string[];
}

export interface Dictionary {
  locale: Lang;
  meta: { title: string; description: string };
  nav: {
    links: { href: string; label: string }[];
    cta: string;
    menuOpen: string;
    menuClose: string;
    langSwitch: { code: string; label: string; href: string };
  };
  hero: {
    kicker: string;
    titleLines: string[];
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    slides: HeroSlide[];
    stats: Stat[];
  };
  marquee: { label: string };
  about: {
    num: string;
    kicker: string;
    statement: string;
    p1: string;
    p2: string;
    glance: string[];
    moreLink?: string;
    switchHint: string;
    companies: {
      id: "unitrans" | "uniagent";
      name: string;
      tagline: string;
      roles: string[];
    }[];
  };
  services: {
    num: string;
    kicker: string;
    title: string;
    sub: string;
    hint: string;
    moreLink?: string;
    items: ServiceItem[];
  };
  process: {
    num: string;
    kicker: string;
    title: string;
    sub: string;
    steps: { name: string; desc: string }[];
    note: string;
    scrollHint: string;
  };
  ops: {
    num: string;
    kicker: string;
    title: string;
    p1: string;
    p2: string;
    listTitle: string;
    items: string[];
    clockLabel: string;
    clockSub: string;
  };
  cargo: {
    num: string;
    kicker: string;
    title: string;
    intro: string;
    agriTitle: string;
    agri: string[];
    addTitle: string;
    add: string[];
    note: string;
    moreLink?: string;
    slides: { src: string; caption: string }[];
    dragHint: string;
  };
  ports: {
    num: string;
    kicker: string;
    title: string;
    sub: string;
    legendSea: string;
    legendRiver: string;
    hint: string;
    hqBadge: string;
    servicesLabel: string;
    moreLink?: string;
    ports: PortInfo[];
  };
  clients: {
    num: string;
    kicker: string;
    title: string;
    sub: string;
    logos: { src: string; name: string }[];
  };
  faq: {
    num: string;
    kicker: string;
    title: string;
    items: { q: string; a: string }[];
  };
  contact: {
    num: string;
    kicker: string;
    title: string;
    sub: string;
    form: {
      name: string;
      company: string;
      email: string;
      phone: string;
      topic: string;
      topics: string[];
      message: string;
      submit: string;
      sending: string;
      success: string;
      successNote: string;
      error: string;
      required: string;
      consent: string;
      consentLink: string;
    };
    info: {
      emailLabel: string;
      phoneLabel: string;
      addressLabel: string;
      email: string;
      phone: string;
      phoneHref: string;
      address: string;
      dutyLabel: string;
      duty: string;
    };
  };
  footer: {
    tagline: string;
    colNav: string;
    colContact: string;
    colCompanies: string;
    localTime: string;
    rights: string;
    designSystem: string;
    legal: { privacy: string; cookies: string; terms: string };
  };
}
