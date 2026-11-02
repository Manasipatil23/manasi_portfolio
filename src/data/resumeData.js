/**
 * Manasi Patil — Portfolio Data
 * Strictly sourced from resume with user updates.
 * Machine Learning Research Intern ended at August 2026.
 */

export const personalInfo = {
  name: "Manasi Patil",
  headline: "Data Engineering • Analytics • Applied ML",
  // Shown in the hero and contact sections
  availability: {
    roles: "Data Engineering · Data Analytics · ML",
    internship: "Seeking a 6-month internship",
    fullTime: "Full-time roles from July 2027",
    location: "Mumbai preferred"
  },
  location: "Thane, Maharashtra, India",
  email: "manasipatil232005@gmail.com",
  // Drop a PDF into /public and set e.g. "/Manasi_Patil_Resume.pdf" to enable the download button
  resumePdfUrl: "",
  socials: {
    linkedin: {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/manasi-patil-3a839b307/",
      ariaLabel: "Connect with Manasi Patil on LinkedIn",
      handle: "manasi-patil-3a839b307",
      highlight: true
    },
    github: {
      name: "GitHub",
      url: "https://github.com/Manasipatil23",
      ariaLabel: "Explore Manasi Patil's GitHub repositories",
      handle: "Manasipatil23"
    },
    leetcode: {
      name: "LeetCode",
      url: "https://leetcode.com/u/manasipatil23/",
      ariaLabel: "View Manasi Patil's LeetCode profile",
      handle: "manasipatil23"
    }
  },
  summary:
    "Computer Engineering undergraduate (CGPA 9.33/10) focused on data engineering and analytics, with hands-on experience building a SQL Server data warehouse, Python data pipelines for ML research, and analytics services. Skilled in Python, SQL, and Power BI, with a record of turning raw data into dashboards, models, and clear insights."
};

export const educationData = [
  {
    institution: "K J Somaiya College of Engineering",
    location: "Mumbai, India",
    degree: "B.Tech in Computer Engineering",
    scoreLabel: "CGPA",
    scoreValue: 9.33,
    scoreMax: 10.0,
    period: "2023 – 2027",
    highlights: ["Algorithms & Data Structures", "Database Architecture", "System Design"]
  },
  {
    institution: "K J Somaiya College of Engineering",
    location: "Mumbai, India",
    degree: "Honours in Data Science & Analytics",
    scoreLabel: "CGPA",
    scoreValue: 10.0,
    scoreMax: 10.0,
    period: "Enrolled Specialization",
    highlights: ["Advanced Statistical Modeling", "Deep Learning Architectures", "Geospatial Analysis"]
  }
];

export const categorizedSkills = [
  {
    category: "Programming & Query Languages",
    description: "Core structured query logic, scripting, and algorithmic problem solving.",
    skills: ["Python", "SQL (MySQL, PostgreSQL, SQL Server)", "T-SQL", "JavaScript"]
  },
  {
    category: "Data Analytics & Visualization",
    description: "Exploratory analysis, business intelligence, warehousing, and automated ETL pipelines.",
    skills: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Power BI",
      "Advanced Excel",
      "EDA",
      "Statistical Analysis",
      "ETL Pipelines",
      "Data Warehousing"
    ]
  },
  {
    category: "AI & Machine Learning",
    description: "Computer vision benchmarking, geospatial epidemiology, and deep neural backbones.",
    skills: [
      "Scikit-learn",
      "PyTorch",
      "TensorFlow",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "LLMs",
      "LangChain",
      "Hugging Face"
    ]
  },
  {
    category: "Databases, Backend & Cloud",
    description: "Relational/NoSQL persistence, secure REST APIs, and containerized deployment.",
    skills: [
      "MongoDB",
      "FastAPI",
      "Node.js",
      "Express.js",
      "React.js",
      "REST APIs (JWT-secured)",
      "Docker",
      "AWS (EC2, S3)",
      "Git"
    ]
  },
  {
    category: "Cybersecurity & Infrastructure",
    description: "Framework compliance, risk assessment, network defense, and script automation.",
    skills: [
      "Security Frameworks (NIST)",
      "Risk & Vulnerability Assessment",
      "Network Security",
      "Linux",
      "SIEM & Incident Response",
      "Python for Security Automation"
    ]
  }
];

export const experienceData = [
  {
    id: "ml-research",
    role: "Machine Learning Research Intern",
    organisation: "K J Somaiya College of Engineering",
    affiliation: "with Universiti Teknologi Malaysia",
    period: "Dec 2025 – Aug 2026", // Updated: ended at August
    location: "Remote",
    tag: "Remote Sensing & Geospatial ML",
    bullets: [
      "Built a reproducible Python pipeline to automate band extraction and NDWI water-index computation from multi-band TIFF satellite data, replacing manual per-image processing.",
      "Benchmarked four segmentation models (DeepLabV3+, MobileNetV2-CBAM, ResNet-50, VGG19) on multi-spectral imagery, selecting the best by IoU and F1 and presenting findings at two institutions.",
      "Developed a malaria risk prediction model with over 90% accuracy using geospatial feature engineering, delivering heatmaps of high-risk zones for public health decisions."
    ],
    technologies: [
      "Python",
      "Multi-band TIFF Pipeline",
      "NDWI Indexing",
      "PyTorch",
      "DeepLabV3+",
      "MobileNetV2-CBAM",
      "ResNet-50",
      "VGG19",
      "Scikit-learn"
    ]
  },
  {
    id: "business-analyst",
    role: "Business Analyst Intern",
    organisation: "Sadekar Enviro",
    period: "Apr 2025 – Jun 2025",
    location: "Thane, India",
    tag: "Environmental Operations & BI",
    bullets: [
      "Analyzed operational and environmental datasets in Python, SQL, and Excel to identify process inefficiencies and presented actionable insights to senior management.",
      "Gathered requirements from cross-functional teams and automated recurring reports and visualizations, replacing manual data compilation."
    ],
    technologies: ["Python", "SQL", "Advanced Excel", "Process Inefficiency Analysis", "Automated Reporting"]
  }
];

export const projectsData = [
  {
    id: "data-warehouse",
    title: "SQL Data Warehouse — Medallion Architecture",
    tagline: "End-to-end multi-layer data warehouse consolidating CRM and ERP systems",
    year: "2026",
    stack: ["SQL Server", "T-SQL", "ETL", "Data Modeling", "Git"],
    githubUrl: "https://github.com/Manasipatil23/sql-data-warehouse-project",
    // Data flow shown as a diagram in the case study (facts from the repo README and resume)
    architecture: [
      { stage: "Sources", items: ["CRM CSV files", "ERP CSV files"] },
      { stage: "Bronze", items: ["Raw tables, loaded as-is", "Batch full load (truncate & insert)"] },
      { stage: "Silver", items: ["Cleaned & standardized tables", "Stored-procedure ETL"] },
      { stage: "Gold", items: ["Star schema as views", "Customer & product dims · sales fact"] },
      { stage: "Consume", items: ["BI & reporting", "Ad-hoc SQL"] }
    ],
    decisions: [
      "Three schemas (bronze, silver, gold) in one SQL Server database, so each layer has a single responsibility.",
      "Bronze and Silver are reloaded in batch with truncate & insert; Gold is exposed as views, so it needs no load step.",
      "Gold is modeled as a star schema with customer and product dimensions around a sales fact table, ready for BI tools.",
      "Data catalog and data-flow documentation kept alongside the SQL, all version-controlled in Git."
    ],
    // Add real excerpts from the repo here, e.g. { title: "silver.load_silver", language: "sql", code: "..." }
    codeSnippets: [],
    problem:
      "Customer, product and sales data was split across separate CRM and ERP source systems, with no single model to report on.",
    contribution:
      "Built a three-layer warehouse in SQL Server (Bronze raw ingestion, Silver cleansing and standardization, Gold reporting) with T-SQL stored procedures moving data between layers, and modeled the Gold layer as a star schema with customer and product dimensions and a sales fact table.",
    outcome:
      "One analytics-ready model over both source systems, documented with a data catalog and data-flow diagrams and version-controlled in Git.",
    bullets: [
      "Designed and built an end-to-end data warehouse on a three-layer architecture (Bronze, Silver, Gold), consolidating CRM and ERP source data into one analytics-ready model.",
      "Developed SQL ETL pipelines using stored procedures for data ingestion, cleansing, standardization, and transformation between layers.",
      "Modeled the Gold layer as a star schema (customer and product dimensions, sales fact table) for business reporting, with a data catalog and data-flow documentation, version-controlled in Git."
    ]
  },
  {
    id: "campus-connect",
    title: "Campus Connect — AI-Powered Placement Analytics Platform",
    tagline: "ML-driven resume evaluation & real-time placement funnel intelligence",
    year: "2026",
    stack: ["React", "FastAPI", "MongoDB", "LLM", "Scikit-learn", "JWT"],
    // The public repo is empty; set this back to the repo URL once the code is pushed
    githubUrl: null,
    repoNote: "Code not yet public",
    architecture: [
      { stage: "React client", items: ["Role-based views", "KPI dashboards"] },
      { stage: "FastAPI service", items: ["JWT-secured REST APIs", "Role-based insights"] },
      { stage: "ML layer", items: ["ATS resume scoring", "Eligibility filtering", "Placement Health Score"] },
      { stage: "MongoDB", items: ["Applicant & placement data"] }
    ],
    decisions: [
      "Analytics exposed through a separate Python/FastAPI service layer, with JWT role checks for four stakeholder roles.",
      "Eligibility filtering and resume scoring automated, so candidates are evaluated on one standard set of criteria across all four roles.",
      "Placement Health Score built with Scikit-learn, using EDA and F1/AUC evaluation to iterate on prediction accuracy."
    ],
    codeSnippets: [],
    problem:
      "Placement teams tracked applicants and shortlisted resumes by hand, evaluation criteria varied across four stakeholder roles, and there was no live view of how the placement funnel was performing.",
    contribution:
      "Built an ML-driven ATS resume-scoring engine with automated eligibility filtering, a Scikit-learn Placement Health Score model behind KPI dashboards, and a Python/FastAPI analytics service exposing role-based insights through JWT-secured REST APIs.",
    outcome:
      "Real-time funnel visibility for placement teams, less manual tracking and shortlisting, and one standard evaluation process across four stakeholder roles, with models iterated on F1 and AUC.",
    bullets: [
      "Designed KPI dashboards and a Placement Health Score prediction model (Scikit-learn) giving placement teams real-time visibility into funnel performance, reducing manual tracking effort.",
      "Built an ML-driven ATS resume-scoring engine and automated eligibility filtering system, cutting manual shortlisting time and standardizing candidate evaluation across four stakeholder roles.",
      "Developed a Python/FastAPI analytics service layer exposing role-based insights via JWT-secured REST APIs, applying EDA and model evaluation (F1, AUC) to iteratively improve prediction accuracy."
    ]
  },
  {
    id: "geospatial-research",
    title: "Multi-Spectral Vision Benchmark & Malaria Risk Model",
    tagline: "Automated TIFF extraction pipeline & 4-architecture segmentation benchmarking",
    year: "2025 – 2026",
    stack: ["DeepLabV3+", "MobileNetV2-CBAM", "ResNet-50", "VGG19", "Python TIFF", "Geospatial"],
    githubUrl: null,
    repoNote: "Research code not public",
    architecture: [
      { stage: "Satellite data", items: ["Multi-band TIFF imagery"] },
      { stage: "Python pipeline", items: ["Band extraction", "NDWI water index"] },
      { stage: "Segmentation benchmark", items: ["DeepLabV3+ · MobileNetV2-CBAM", "ResNet-50 · VGG19", "Ranked by IoU & F1"] },
      { stage: "Risk model", items: ["Geospatial feature engineering", ">90% accuracy"] },
      { stage: "Output", items: ["Heatmaps of high-risk zones"] }
    ],
    decisions: [
      "Band extraction and NDWI computation turned into one reproducible Python pipeline instead of manual per-image processing.",
      "Four segmentation architectures compared on the same multi-spectral imagery, with the best chosen by IoU and F1.",
      "Risk predictions delivered as heatmaps of high-risk zones for public-health decisions."
    ],
    codeSnippets: [],
    problem:
      "Band extraction and water-index calculation on multi-band satellite TIFFs were done by hand, one image at a time, and the imagery needed to become malaria-risk maps for public-health decisions.",
    contribution:
      "Built a reproducible Python pipeline for band extraction and NDWI computation, benchmarked four segmentation models (DeepLabV3+, MobileNetV2-CBAM, ResNet-50, VGG19) on IoU and F1, and developed a malaria risk prediction model using geospatial feature engineering.",
    outcome:
      "Manual per-image processing replaced by an automated pipeline, a risk model above 90% accuracy with heatmaps of high-risk zones, and findings presented at two institutions.",
    bullets: [
      "Built a reproducible Python pipeline to automate band extraction and NDWI water-index computation from multi-band TIFF satellite data, replacing manual per-image processing.",
      "Benchmarked four segmentation models (DeepLabV3+, MobileNetV2-CBAM, ResNet-50, VGG19) on multi-spectral imagery, selecting the best by IoU and F1 and presenting findings at two institutions.",
      "Developed a malaria risk prediction model with over 90% accuracy using geospatial feature engineering, delivering heatmaps of high-risk zones for public health decisions."
    ]
  }
];

export const certificationsData = [
  {
    title: "Databases and SQL for Data Science with Python",
    issuer: "IBM",
    period: "Certified",
    category: "Databases & Data Science"
  },
  {
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google",
    period: "In Progress",
    category: "Cybersecurity & Defense"
  },
  {
    title: "Google AI Essentials Certificate",
    issuer: "Google",
    period: "Certified",
    category: "Artificial Intelligence"
  },
  {
    title: "Deloitte Data Analytics Job Simulation",
    issuer: "Forage",
    period: "June 2025",
    category: "Business Analytics"
  }
];

// Skills shown in the Skills section, each linked to where it was used.
// `where` ids match anchors on the page (project-*, exp-*, education).
export const skillEvidence = [
  {
    group: "Data Engineering",
    skills: [
      { name: "SQL / T-SQL", where: ["project-data-warehouse", "exp-business-analyst", "education"] },
      { name: "SQL Server", where: ["project-data-warehouse"] },
      { name: "ETL (stored procedures)", where: ["project-data-warehouse"] },
      { name: "Dimensional modeling (star schema)", where: ["project-data-warehouse"] },
      { name: "Medallion architecture", where: ["project-data-warehouse"] },
      { name: "Python data pipelines", where: ["project-geospatial-research", "exp-ml-research"] },
      { name: "MongoDB", where: ["project-campus-connect"] },
      { name: "Git", where: ["project-data-warehouse"] }
    ]
  },
  {
    group: "Analytics",
    skills: [
      { name: "Python analysis", where: ["exp-business-analyst"] },
      { name: "Excel & automated reporting", where: ["exp-business-analyst"] },
      { name: "KPI dashboards", where: ["project-campus-connect"] },
      { name: "EDA", where: ["project-campus-connect"] },
      { name: "Requirements gathering", where: ["exp-business-analyst"] }
    ]
  },
  {
    group: "Machine Learning",
    skills: [
      { name: "Scikit-learn", where: ["project-campus-connect", "project-geospatial-research"] },
      { name: "PyTorch segmentation models", where: ["project-geospatial-research", "exp-ml-research"] },
      { name: "Model evaluation (F1, AUC, IoU)", where: ["project-campus-connect", "project-geospatial-research"] },
      { name: "Geospatial feature engineering", where: ["project-geospatial-research"] }
    ]
  },
  {
    group: "Backend",
    skills: [
      { name: "FastAPI & REST APIs (JWT)", where: ["project-campus-connect"] },
      { name: "React", where: ["project-campus-connect"] }
    ]
  }
];

// Labels for the evidence links above
export const evidenceLabels = {
  "project-data-warehouse": "Data Warehouse",
  "project-campus-connect": "Campus Connect",
  "project-geospatial-research": "Satellite ML Research",
  "exp-business-analyst": "BA Internship",
  "exp-ml-research": "ML Research Internship",
  education: "IBM SQL Certificate"
};

// Listed without a linked project (yet)
export const otherSkills = [
  "Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI", "Statistical Analysis",
  "TensorFlow", "NLP", "LLMs", "LangChain", "Hugging Face",
  "JavaScript", "Node.js", "Express.js", "Docker", "AWS (EC2, S3)", "PostgreSQL", "MySQL",
  "Security frameworks (NIST)", "Linux"
];
