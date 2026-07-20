import type { PagesDict } from "./pages-types";

export const pagesEn: PagesDict = {
  ctaBand: {
    title: "Ready to support your next port call.",
    sub: "Tell us the port, the cargo and the dates — we respond quickly.",
    button: "Get in touch",
  },
  breadcrumbHome: "Home",

  about: {
    hero: {
      kicker: "About us",
      title: "Three decades in Bulgarian ports.",
      intro:
        "Unitrans Ltd. and Uniagent Varna Ltd. have operated as one coordinated team since 1993 — the local expertise international traders rely on.",
    },
    statement:
      "The vessel, the cargo, the documents and the communication — in one pair of hands, from nomination to departure.",
    timelineKicker: "The story",
    timelineTitle: "From Varna to every major port.",
    timeline: [
      {
        year: "1993",
        title: "The beginning",
        text: "Founded in Varna. The first vessel calls for international clients in Bulgaria's largest Black Sea port.",
      },
      {
        year: "1990s",
        title: "Two specialised companies",
        text: "The business splits into two specialised firms: Unitrans — forwarding and customs; Uniagent Varna — ship agency and husbandry.",
      },
      {
        year: "2000s",
        title: "Nationwide coverage",
        text: "Expansion to Burgas, Balchik and the Danube river ports. The same service standard — from the Black Sea to the Danube.",
      },
      {
        year: "2010s",
        title: "Trusted by the majors",
        text: "Long-term relationships with leading international grain traders and industrial companies. ISO certification of our processes.",
      },
      {
        year: "Today",
        title: "One coordinated team",
        text: "20 professionals, 10 ports covered, duty coverage 365 days a year. Two companies, one responsibility to the client.",
      },
    ],
    dragHint: "Drag",
    companiesKicker: "The structure",
    companiesTitle: "Two companies. One responsibility.",
    companiesIntro:
      "Specialisation gives depth of expertise — shared coordination gives the client a single partner and a single flow of information.",
    companies: [
      {
        id: "unitrans",
        name: "Unitrans Ltd.",
        desc: "Responsible for the cargo: from inland transport and warehousing arrangements, through cargo documentation, to customs clearance for import, export and transit. A dedicated forwarding and customs team with daily practice in Bulgarian ports.",
        roles: ["Freight forwarding", "Customs brokerage", "Port logistics", "Terminal operations"],
      },
      {
        id: "uniagent",
        name: "Uniagent Varna Ltd.",
        desc: "Responsible for the vessel: full agency support at arrival and departure, clearance, husbandry services, crew changes, deliveries, bunkering, repair assistance and dry-dock coordination at Bulgarian yards.",
        roles: ["Ship agency", "Husbandry services", "Ship repairs", "Dry-dock coordination"],
      },
    ],
    numbersKicker: "The numbers",
    numbersTitle: "Experience, quantified.",
    numbers: [
      { value: 1993, label: "established", plain: true },
      { value: 30, suffix: "+", label: "years of experience" },
      { value: 20, label: "professionals" },
      { value: 10, label: "ports covered" },
      { value: 365, label: "days on duty" },
      { value: 17, label: "long-standing partners" },
    ],
    strengthsKicker: "Why clients choose us",
    strengthsTitle: "Eight reasons, proven in practice.",
    strengths: [
      { title: "Three decades of experience", text: "Working Bulgarian ports since 1993 — we have seen every kind of operation, season and situation." },
      { title: "Two companies, one team", text: "Specialisation without losing coordination — the vessel and the cargo move together." },
      { title: "Nationwide coverage", text: "The same standard in Varna, Burgas, Balchik and the seven Danube ports." },
      { title: "Dedicated departments", text: "Agency, forwarding, customs and operations — each with its own experienced team." },
      { title: "Fast response", text: "Short decision chains and access to the people actually running the operation." },
      { title: "Direct contact", text: "No call centres — you talk to the operational team responsible for your vessel." },
      { title: "Consistency", text: "The same quality of execution on every call, in every port." },
      { title: "Long-term relationships", text: "Clients stay for years — the strongest reference in this industry." },
    ],
  },

  services: {
    hero: {
      kicker: "Services",
      title: "Every stage of the port call. In detail.",
      intro:
        "Four specialised services that together cover the full life cycle of a vessel call — from nomination to departure.",
    },
    navLabel: "On this page",
    processKicker: "The process",
    processTitle: "How an operation unfolds.",
    items: [
      {
        id: "ship-agency",
        name: "Ship Agency",
        lead: "The vessel is in good hands — before, during and after the call.",
        p1: "Uniagent Varna's agency team takes over from the moment of nomination: preparing the arrival, coordinating with authorities and the terminal, securing clearance and all documentation. Master and operator get one local contact for everything.",
        p2: "We also cover the full spectrum of husbandry services — crew changes, spare parts and provisions delivery, bunkering coordination, medical assistance, and where needed, repair assistance and dry-dock coordination at Bulgarian yards.",
        pointsTitle: "What's included",
        image: "/images/services.webp",
        companyLabel: "A Uniagent Varna service",
        company: "uniagent",
      },
      {
        id: "freight-forwarding",
        name: "Freight Forwarding",
        lead: "Cargo that moves to plan — door to port and back.",
        p1: "Unitrans' forwarding team organises the entire logistics chain around the port operation: inland truck and rail transport, schedule alignment with the terminal, warehousing and complete cargo documentation.",
        p2: "We handle import and export flows with equal confidence. We know the capacity, constraints and practices of every Bulgarian terminal — and plan so the vessel never waits for cargo, nor cargo for the vessel.",
        pointsTitle: "What's included",
        image: "/images/cargo.webp",
        companyLabel: "A Unitrans service",
        company: "unitrans",
      },
      {
        id: "customs",
        name: "Customs Brokerage",
        lead: "Customs — without friction, delay or surprises.",
        p1: "Our customs department prepares and files declarations for import, export and transit, manages temporary storage formalities and communicates directly with customs authorities in every covered port.",
        p2: "Decades of daily practice mean we know the procedures and the people — and resolve questions before they become delays. Cargo clears customs at the pace of the operation, not the other way round.",
        pointsTitle: "What's included",
        image: "/images/about.webp",
        companyLabel: "A Unitrans service",
        company: "unitrans",
      },
      {
        id: "port-operations",
        name: "Port Operations",
        lead: "Eyes on the quay while cargo is moving.",
        p1: "The operations team follows loading and discharging on site: coordinating between vessel, terminal, surveyors and receivers, monitoring the pace and quality of handling and resolving operational questions as they arise.",
        p2: "The client receives a daily report with loaded or discharged quantities, a completion forecast and any relevant development — without having to ask. Transparency is the standard, not an extra.",
        pointsTitle: "What's included",
        image: "/images/process.webp",
        companyLabel: "A Unitrans service",
        company: "unitrans",
      },
    ],
  },

  cargo: {
    hero: {
      kicker: "Cargo expertise",
      title: "Grain is our native language.",
      intro:
        "Three decades of agricultural and bulk cargo through Bulgarian ports — we know the commodities, the seasons and the terminals in depth.",
    },
    explorerKicker: "Agricultural commodities",
    explorerTitle: "The core crops we move.",
    explorerHint: "Select a commodity",
    commodities: [
      {
        name: "Wheat",
        season: "Harvest: June – July",
        desc: "Bulgaria's main export crop. Shipment peaks begin right after harvest and set the rhythm of the ports through Q3. We handle all classes of milling and feed wheat.",
      },
      {
        name: "Corn",
        season: "Harvest: September – October",
        desc: "The second big export flow — the autumn season. Requires attention to moisture and ventilation in storage and loading. Deep experience with flows to the Mediterranean and Middle East.",
      },
      {
        name: "Barley",
        season: "Harvest: June",
        desc: "The first crop of the new harvest — it opens the export season. A short, intensive shipment window that demands berth and tonnage planning in advance.",
      },
      {
        name: "Sunflower seeds",
        season: "Harvest: September",
        desc: "Bulgaria is among the EU's leading producers. We handle both seeds for crushing and meal — mindful of the specific density and self-heating requirements.",
      },
      {
        name: "Rapeseed",
        season: "Harvest: July",
        desc: "A moisture- and temperature-sensitive oilseed. Requires precise coordination between deliveries, storage and the loading window.",
      },
      {
        name: "Vegetable oils",
        season: "Year-round",
        desc: "Liquid bulk — sunflower and rapeseed oil. Coordination with bonded warehouses, fiscal procedures and specialised food-grade liquid terminals.",
      },
    ],
    additionalKicker: "Additional experience",
    additionalTitle: "Beyond grain.",
    additional: [
      { name: "Fertilisers", desc: "Bulk and bagged — imports for the agricultural sector, with their specific storage requirements." },
      { name: "Steel products", desc: "Coils, profiles, pipes — breakbulk operations with careful attention to lashing." },
      { name: "Containers", desc: "Full container services through the Varna and Burgas terminals." },
      { name: "Project cargo", desc: "Out-of-gauge and heavy units — lift planning, securing and transport." },
      { name: "Breakbulk cargo", desc: "Mixed breakbulk parcels — timber, palletised goods, equipment." },
    ],
    opsNoteTitle: "How we run commodity operations",
    opsNote:
      "Commodity markets don't wait. So our operational standard is simple: accurate quantities every day, timely notice of every deviation, and coordination that never leaves a vessel waiting. Thirty years on, that is why traders keep coming back.",
  },

  ports: {
    hero: {
      kicker: "Ports",
      title: "Ten ports. One standard.",
      intro:
        "From the Black Sea to the Danube — we are present wherever a Bulgarian port handles commercial cargo.",
    },
    mapKicker: "The map",
    mapTitle: "Select a port.",
    directoryKicker: "Directory",
    directoryTitle: "Every port in detail.",
    seaTitle: "Black Sea",
    riverTitle: "Danube",
    tracking: {
      kicker: "Live",
      title: "Vessels in Bulgarian waters — in real time.",
      intro:
        "The AIS map shows vessel movements along the Bulgarian coast right now: at anchor, alongside and under way. Useful for a quick check on where your vessel is.",
      bullets: [
        "Data from vessels' AIS transponders, updated in real time",
        "Coverage of Varna, Burgas and the entire western Black Sea coast",
        "Click a vessel for name, type, course and speed",
      ],
      mapLabel: "AIS map · Bulgarian coast",
      disclaimer:
        "The map is provided by VesselFinder using public AIS data and is for information only. For operational updates on your vessel, contact our duty team.",
      openFull: "Open the full-screen map",
    },
  },

  contact: {
    hero: {
      kicker: "Contact",
      title: "Let's talk about your vessel.",
      intro: "The form is the fastest way to reach the team — or go direct by email and phone, 365 days a year.",
    },
    stepsKicker: "How it starts",
    stepsTitle: "Three steps to the first operation.",
    steps: [
      { title: "Enquiry", text: "Send the port, cargo, quantity and dates — via the form or by email." },
      { title: "Quote & nomination", text: "We reply with terms and scope. On agreement, you nominate us as agent/forwarder." },
      { title: "Operation", text: "We take over the vessel and cargo — with daily reports until completion." },
    ],
    mapKicker: "The office",
    mapTitle: "Head office — Varna.",
    mapAddress: "1, Vardar Str., 9000 Varna, Bulgaria",
  },

  blog: {
    hero: {
      kicker: "Blog",
      title: "Practical notes from the ports.",
      intro:
        "Short, useful reads from our operational practice — for traders, operators and everyone working with Bulgarian ports.",
    },
    all: "All articles",
    readMore: "Read",
    back: "Back to the blog",
    minRead: "min read",
    moreArticles: "More from the blog",
    categories: {
      operations: "Operations",
      cargo: "Cargo",
      customs: "Customs",
      ports: "Ports",
    },
  },
};
