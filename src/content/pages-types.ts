export interface CtaBandContent {
  title: string;
  sub: string;
  button: string;
}

export interface PageHeroContent {
  kicker: string;
  title: string;
  intro: string;
}

export interface PagesDict {
  ctaBand: CtaBandContent;
  breadcrumbHome: string;

  about: {
    hero: PageHeroContent;
    statement: string;
    timelineKicker: string;
    timelineTitle: string;
    timeline: { year: string; title: string; text: string }[];
    dragHint: string;
    companiesKicker: string;
    companiesTitle: string;
    companiesIntro: string;
    companies: {
      id: "unitrans" | "uniagent";
      name: string;
      desc: string;
      roles: string[];
    }[];
    numbersKicker: string;
    numbersTitle: string;
    numbers: { value: number; suffix?: string; label: string; plain?: boolean }[];
    strengthsKicker: string;
    strengthsTitle: string;
    strengths: { title: string; text: string }[];
  };

  services: {
    hero: PageHeroContent;
    navLabel: string;
    processKicker: string;
    processTitle: string;
    items: {
      id: string;
      name: string;
      lead: string;
      p1: string;
      p2: string;
      pointsTitle: string;
      image: string;
      companyLabel: string;
      company: "unitrans" | "uniagent";
    }[];
  };

  cargo: {
    hero: PageHeroContent;
    explorerKicker: string;
    explorerTitle: string;
    explorerHint: string;
    commodities: { name: string; season: string; desc: string }[];
    additionalKicker: string;
    additionalTitle: string;
    additional: { name: string; desc: string }[];
    opsNoteTitle: string;
    opsNote: string;
  };

  ports: {
    hero: PageHeroContent;
    mapKicker: string;
    mapTitle: string;
    directoryKicker: string;
    directoryTitle: string;
    seaTitle: string;
    riverTitle: string;
    tracking: {
      kicker: string;
      title: string;
      intro: string;
      bullets: string[];
      mapLabel: string;
      disclaimer: string;
      openFull: string;
    };
  };

  contact: {
    hero: PageHeroContent;
    stepsKicker: string;
    stepsTitle: string;
    steps: { title: string; text: string }[];
    mapKicker: string;
    mapTitle: string;
    mapAddress: string;
  };

  blog: {
    hero: PageHeroContent;
    all: string;
    readMore: string;
    back: string;
    minRead: string;
    moreArticles: string;
    categories: Record<string, string>;
  };
}
