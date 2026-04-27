export type Tier = 1 | 2 | 3;

export type SkillItem = { name: string; tier: Tier };

export type SkillCategory = {
  category: string;
  items: SkillItem[];
};

export type ExperienceItem = {
  company: string;
  division?: string;
  role: string;
  location: string;
  dates: string;
  description?: string | null;
  bullets: string[];
  upcoming?: string;
  tags?: string[];
  caseStudySlug?: string;
};

export type Degree = {
  degree: string;
  school: string;
  schoolShort: string;
  location: string;
  dates: string;
  minors?: string[];
};

export type HonorItem = {
  label: string;
  school: string;
  year: number | string;
};

export type Certification = {
  name: string;
  issuer: string;
  year?: number | null;
  link?: string;
  inProgress?: boolean;
};

export type PressItem = {
  label: string;
  url?: string;
  outlet?: string;
  date?: string;
  tags?: string[];
  thumbnail?: string;
};

export type ProjectItem = {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  link?: string | null;
  status: "live" | "in-progress" | "archived";
  featured?: boolean;
};

export const site = {
  meta: {
    name: "Samiksha Kature",
    nameShort: "SK",
    tagline: "Commercial Analyst · Data Scientist · Builder",
    location: "West Deptford, NJ",
    locationTimezone: "America/New_York",
    email: "s.s.kature@gmail.com",
    linkedin: "https://www.linkedin.com/in/samiksha-kature/",
    github: "https://github.com/SamikshaKature",
    resumeUrl: "/resume.pdf",
  },

  rotatingTitles: [
    "Commercial Analyst",
    "Data Scientist",
    "BI & Analytics Engineer",
    "Product Thinker",
    "Curious Builder",
  ],

  about: {
    overview:
      "I'm a Commercial Analyst at Johnson Matthey in West Deptford, NJ, participating in their competitive global LEAD Rotation Programme. My background sits at the intersection of business analytics, data science, and industrial chemistry — currently building expertise in physics-informed ML for emissions-critical materials. I'm an active runner, a hardware tinkerer, and a strong believer that the best solutions come from understanding both the data and the domain.",
    beyondWork: [
      {
        icon: "Footprints",
        text: "Training for a 16K and a half marathon — currently logging ~25 mi/wk",
      },
      {
        icon: "Cpu",
        text: "Building Pixel, an ESP32-C3 desk robot with an OLED face and a snarky personality",
      },
      {
        icon: "BookOpen",
        text: "Re-reading Thinking, Fast and Slow; queued: Working Backwards",
      },
      {
        icon: "Mountain",
        text: "Looking for my next long-trail hike for spring 2026",
      },
    ],
    currentlyTeaser: [
      "JM LEAD Rotation Programme, West Deptford NJ",
      "Upcoming: Process Analytics — hybrid ML + kinetic modeling",
      "Training for a 16K and half marathon",
    ],
    photoPlaceholder: true,
    photoUrl: null as string | null,
  },

  experience: [
    {
      company: "Johnson Matthey",
      division: "Precious Metals (PGMS)",
      role: "Commercial Analyst — LEAD Rotation Programme",
      location: "West Deptford, NJ",
      dates: "Sept 2025 – Present",
      description:
        "Selected for Johnson Matthey's competitive global LEAD Program, a structured leadership development program focused on building analytical, commercial, and leadership capabilities.",
      bullets: [
        "Led a cross-business gap analysis filtering 20,000+ transactional records across 5 years of UK and US data to identify high-value targets; structured outputs into visualizations and reports that directly shaped commercial capture strategy across 3 business units.",
        "Built demand forecasting and market sizing models using FY2018–2025 data for the nitric acid platinum filter market, producing quantitative analysis that supported a major customer's market entry decision.",
        "Developed tariff impact and carbon savings models for a strategic account, quantifying secondary PGM emissions benefits per troy ounce and modeling 15–25% export tariff scenarios to support data-driven account decisions.",
        "Analyzed precious metal flow volumes across multiple product lines, aggregating cross-business processing data into structured reporting views for refining capacity and supply chain planning.",
        "Redesigned inter-site refining pricing terms by analyzing 3 years of transaction data, restructuring invoice-based models to improve pricing accuracy and margin alignment.",
      ],
      upcoming:
        "Upcoming Rotation: Process Analytics, Core Capabilities — hybrid ML + first-principles kinetic modeling for autocatalyst performance prediction in Clean Air applications.",
      tags: ["Commercial Analytics", "Forecasting", "Power BI", "Python"],
      caseStudySlug: "nitric-acid-platinum",
    } satisfies ExperienceItem,
    {
      company: "Johnson Matthey",
      division: "Catalyst Technologies",
      role: "Data & Business Intelligence Analyst Intern",
      location: "Savannah, GA",
      dates: "June 2025 – Aug 2025",
      description: null,
      bullets: [
        "Conducted structured stakeholder interviews across Engineering, Quality, and Operations to surface data pain points and define dashboard requirements, owning the full BI requirements-gathering lifecycle.",
        "Designed and deployed interactive Power BI dashboards for quality control, assurance, and production operations, providing real-time visibility into operational metrics for cross-functional teams.",
        "Built automated reporting pipelines, eliminating 5+ hours/week of manual report creation and reducing daily equipment-check time by 50%.",
        "Ran a post-deployment feedback cycle — collected adoption metrics, synthesized user themes, iterated on dashboards, and created training resources (SOPs, video walkthroughs) that drove measurable adoption and reduced non-conformance events.",
      ],
      tags: ["Power BI", "DAX", "Stakeholder Management", "Automation"],
      caseStudySlug: "jm-bi-suite",
    } satisfies ExperienceItem,
    {
      company: "Hatua Network",
      division: undefined,
      role: "Research Analyst Intern",
      location: "Boston, MA",
      dates: "May 2024 – Aug 2024",
      description: null,
      bullets: [
        "Cleaned and enriched a 10,000+ row dataset from 5+ sources using Python (Pandas) and SQL, improving feasibility model accuracy and enabling reliable data-driven recommendations for leadership.",
        "Built a competitive intelligence dataset mapping 65 customers, 13 collaborators, and 20 competitors across 6 East African countries, covering 85% of relevant organizations and feeding strategic reporting.",
        "Conducted a structured literature review on soft skills' impact on employment outcomes to support data-backed market entry recommendations.",
      ],
      tags: ["Python", "SQL", "Research Analytics"],
      caseStudySlug: "hatua-ci",
    } satisfies ExperienceItem,
    {
      company: "Implica Global Corporation",
      division: undefined,
      role: "Data Analyst Intern",
      location: "Bologna, Italy",
      dates: "May 2023 – Aug 2023",
      description: null,
      bullets: [
        "Applied statistical analysis using Python (Pandas, NumPy) to customer transaction data, identifying behavioral patterns that drove a 20% improvement in fraud detection accuracy.",
        "Drove a 25% lift in online conversion rates by designing and executing A/B experiments on core product UX elements; leveraged Power BI to analyze user behavior funnels and deliver actionable insights.",
      ],
      tags: ["Python", "A/B Testing", "Power BI", "Statistics"],
    } satisfies ExperienceItem,
  ] as ExperienceItem[],

  education: {
    degrees: [
      {
        degree: "M.S. in Business Analytics",
        school: "Northeastern University",
        schoolShort: "NEU",
        location: "Boston, MA",
        dates: "Aug 2023 – Dec 2024",
      },
      {
        degree: "B.S. in Computer Science",
        school: "The Pennsylvania State University",
        schoolShort: "PSU",
        location: "University Park, PA",
        dates: "Aug 2019 – May 2023",
        minors: ["Mathematics", "Business & Liberal Arts"],
      },
    ] as Degree[],

    honors: [
      {
        label: "Beta Gamma Sigma Inductee",
        school: "Northeastern University",
        year: 2024,
      },
      {
        label: "DMSB Achiever's Scholarship",
        school: "Northeastern University",
        year: 2023,
      },
      {
        label: "Dean's List",
        school: "The Pennsylvania State University",
        year: "2020 / 2021 / 2022",
      },
    ] as HonorItem[],

    certifications: [
      {
        name: "BCG Introduction to Strategy Consulting",
        issuer: "BCG",
        year: null,
      },
      {
        name: "Accenture Data Analytics & Visualization",
        issuer: "Accenture",
        year: null,
      },
    ] as Certification[],
  },

  skills: {
    // TODO(samiksha): edit tiers manually — all set to 2 (Working) as default
    technical: [
      {
        category: "Data Analysis & BI",
        items: [
          { name: "Python",          tier: 2 },
          { name: "Pandas",          tier: 2 },
          { name: "NumPy",           tier: 2 },
          { name: "Scikit-learn",    tier: 2 },
          { name: "Matplotlib",      tier: 2 },
          { name: "Seaborn",         tier: 2 },
          { name: "R",               tier: 2 },
          { name: "SQL",             tier: 2 },
          { name: "Excel",           tier: 2 },
          { name: "A/B Testing",     tier: 2 },
          { name: "Regression",      tier: 2 },
          { name: "Cohort Analysis", tier: 2 },
        ] as SkillItem[],
      },
      {
        category: "Visualization & Reporting",
        items: [
          { name: "Power BI",        tier: 2 },
          { name: "DAX",             tier: 2 },
          { name: "Power Query",     tier: 2 },
          { name: "Tableau",         tier: 2 },
          { name: "Microsoft Visio", tier: 2 },
          { name: "Lucidchart",      tier: 2 },
          { name: "ArcGIS",          tier: 2 },
        ] as SkillItem[],
      },
      {
        category: "Automation & Infrastructure",
        items: [
          { name: "ETL Pipelines",           tier: 2 },
          { name: "Alteryx",                 tier: 2 },
          { name: "Zapier",                  tier: 2 },
          { name: "Make",                    tier: 2 },
          { name: "Python Scripting",        tier: 2 },
          { name: "Low-Code/No-Code Tooling",tier: 2 },
        ] as SkillItem[],
      },
      {
        category: "Systems & Tools",
        items: [
          { name: "SAP",                 tier: 2 },
          { name: "Salesforce",          tier: 2 },
          { name: "Azure",               tier: 2 },
          { name: "Relational Databases",tier: 2 },
          { name: "JIRA",                tier: 2 },
          { name: "Agile/Scrum",         tier: 2 },
          { name: "Git",                 tier: 2 },
          { name: "Confluence",          tier: 2 },
        ] as SkillItem[],
      },
    ] as SkillCategory[],

    competencies: [
      "Commercial Analytics",
      "Pricing Strategy & Gap Analysis",
      "Market Sizing & Forecasting",
      "Business Intelligence",
      "Data Storytelling",
      "Dashboard Design",
      "Stakeholder Requirements Gathering",
      "Cross-functional Communication",
      "Process Improvement",
    ],

    research: [
      "Hybrid ML / first-principles kinetic modeling",
      "Industrial process optimization",
      "Precious metals & emissions-critical materials",
      "Physics-informed machine learning",
    ],
  },

  projects: [
    {
      title: "Pixel — Desk Robot",
      slug: "pixel",
      description:
        "ESP32-C3 hardware build with an OLED face, voice pipeline, and a snarky AI personality. Python backend running on MacBook over WiFi. Built as a passion project in hardware + embedded AI.",
      tags: ["ESP32-C3", "Python", "Hardware", "Voice AI", "OLED"],
      link: null,
      status: "in-progress",
      featured: true,
    },
    {
      title: "Nitric Acid Platinum Market Model",
      slug: "nitric-acid-platinum",
      description:
        "Demand forecasting and market sizing model using 7 years of historical data (FY2018–2025) to support a major customer's market entry decision at Johnson Matthey.",
      tags: ["Python", "Excel", "Market Analysis", "Forecasting"],
      link: null,
      status: "archived",
    },
    {
      title: "BI Dashboard Suite — JM Catalyst Technologies",
      slug: "jm-bi-suite",
      description:
        "End-to-end Power BI dashboard lifecycle: stakeholder interviews, requirements, design, deployment, and post-adoption feedback cycle. Eliminated 5+ hours/week of manual reporting.",
      tags: ["Power BI", "DAX", "Power Query", "Stakeholder Management"],
      link: null,
      status: "archived",
    },
    {
      title: "Competitive Intelligence Dataset — Hatua Network",
      slug: "hatua-ci",
      description:
        "Built a structured intelligence dataset mapping 65 customers, 13 collaborators, and 20 competitors across 6 East African countries to inform strategic reporting and market expansion.",
      tags: ["Python", "SQL", "Pandas", "Research Analytics"],
      link: null,
      status: "archived",
    },
  ] as ProjectItem[],

  press: {
    visible: false,
    media:        [] as PressItem[],
    publications: [] as PressItem[],
    speaking:     [] as PressItem[],
  },
} as const;
