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
    fullTime: "Full-time from July 2027",
    location: "Mumbai"
  },
  location: "Thane, Maharashtra, India",
  email: "manasipatil232005@gmail.com",
  // PDF in /public (rebuilt from resume/resume.html); enables the Download PDF button
  resumePdfUrl: "/Manasi_Patil_Resume.pdf",
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
    "Computer Engineering undergraduate (CGPA 9.33/10) focused on data engineering and analytics, with hands-on experience building a SQL Server data warehouse, Python data pipelines for ML research, and analytics services. Skilled in Python, SQL, and Power BI. Seeking a 6-month internship and full-time roles from July 2027."
};

export const educationData = [
  {
    institution: "K J Somaiya College of Engineering",
    location: "Mumbai, India",
    degree: "B.Tech in Computer Engineering",
    scoreLabel: "CGPA",
    scoreValue: 9.33,
    scoreMax: 10.0,
    period: "2023 – 2027"
  },
  {
    institution: "K J Somaiya College of Engineering",
    location: "Mumbai, India",
    degree: "Honours in Data Science & Analytics",
    scoreLabel: "CGPA",
    scoreValue: 10.0,
    scoreMax: 10.0,
    period: "Enrolled Specialization"
  }
];

// Same groups and wording as the PDF resume (resume/resume.html); shown in the resume modal
export const categorizedSkills = [
  {
    category: "Languages & Databases",
    skills: ["Python", "SQL (MySQL, PostgreSQL, SQL Server)", "MongoDB"]
  },
  {
    category: "Data & Analytics",
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI", "Advanced Excel", "EDA", "Statistical Analysis", "ETL", "Data Warehousing"]
  },
  {
    category: "AI/ML",
    skills: ["Scikit-learn", "PyTorch", "TensorFlow", "Deep Learning", "Computer Vision", "NLP", "LLMs", "LangChain", "Hugging Face"]
  },
  {
    category: "Backend & Cloud",
    skills: ["FastAPI", "Node.js", "Express.js", "React.js", "REST APIs", "Docker", "AWS (EC2, S3)", "Git"]
  },
  {
    category: "Cybersecurity",
    skills: ["Security Frameworks (NIST)", "Risk & Vulnerability Assessment", "Network Security", "Linux", "SIEM & Incident Response", "Python for Security Automation"]
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
    // Anchor of the matching project case study, linked from the timeline
    caseStudy: "research",
    certificate: { title: "Internship completion certificate, KJSSE with UTM Malaysia", image: "/certificates/ml-internship-utm.webp" },
    // Shown on the site instead of the bullets, which the case study already covers (the resume keeps the bullets)
    brief:
      "In a team of two, built a Python pipeline that turns multi-band satellite imagery into NDWI patches, then trained and compared five deep-learning models that map malaria-risk zones. Findings presented at two institutions.",
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
    period: "May 2025 – Jun 2025",
    location: "Thane, India",
    tag: "Environmental Operations & BI",
    bullets: [
      "Analyzed operational and environmental datasets in Python, SQL, and Excel to identify process inefficiencies and presented actionable insights to senior management.",
      "Gathered requirements from cross-functional teams and automated recurring reports and visualizations, replacing manual data compilation.",
      "Built Power BI dashboards to support business decisions."
    ],
    caseStudy: "gold-explorer",
    caseStudyLabel: "See a dashboard demo",
    technologies: ["Power BI", "Python", "SQL", "Advanced Excel", "Process Inefficiency Analysis", "Automated Reporting"]
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
  }
];

export const certificationsData = [
  {
    title: "Databases and SQL for Data Science with Python",
    issuer: "IBM",
    period: "Certified",
    category: "Databases & Data Science",
    image: "/certificates/ibm-sql.webp",
    verifyUrl: "https://coursera.org/verify/ZUE0LSZ3FLVS"
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
    period: "Jun 2026",
    category: "Artificial Intelligence",
    image: "/certificates/google-ai-essentials.webp",
    verifyUrl: "https://coursera.org/verify/specialization/JGWW0OUNKRR7"
  },
  {
    title: "Deloitte Data Analytics Job Simulation",
    issuer: "Forage",
    period: "June 2025",
    category: "Business Analytics",
    image: "/certificates/deloitte-data-analytics.webp"
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
      { name: "Python data pipelines", where: ["research"] },
      { name: "MongoDB", where: ["project-campus-connect"] },
      { name: "Git", where: ["project-data-warehouse"] }
    ]
  },
  {
    group: "Analytics",
    skills: [
      { name: "Power BI dashboards", where: ["exp-business-analyst"] },
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
      { name: "Scikit-learn", where: ["project-campus-connect"] },
      { name: "Deep learning (DeepLabV3+, ResNet-50, VGG19)", where: ["research"] },
      { name: "Model evaluation (precision, recall, F1)", where: ["research", "project-campus-connect"] },
      { name: "Satellite imagery & NDWI", where: ["research"] }
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
  research: "ML Research",
  "exp-business-analyst": "BA Internship",
  education: "IBM SQL Certificate"
};

// Listed without a linked project (yet)
export const otherSkills = [
  "Pandas", "NumPy", "Matplotlib", "Seaborn", "Statistical Analysis",
  "TensorFlow", "NLP", "LLMs", "LangChain", "Hugging Face",
  "Node.js", "Express.js", "Docker", "AWS (EC2, S3)", "PostgreSQL", "MySQL",
  "Security frameworks (NIST)", "Linux"
];

// ML research internship, from the internship presentation (Somaiya × Universiti Teknologi Malaysia)
export const researchData = {
  team: "Team of two, with Omkar Dinde",
  pipeline: [
    { stage: "Satellite TIFFs", items: ["Multi-band imagery", "Bands read per image"] },
    { stage: "NDWI", items: ["Water-index map", "Normalized pixel values"] },
    { stage: "64×64 patches", items: ["Risk / no-risk labels", "Rotation, flip, zoom"] },
    { stage: "5 models", items: ["Segmentation + patch classifiers", "Precision, recall, F1"] },
    { stage: "Risk maps", items: ["Heatmaps & contours", "Binary high-risk zones"] }
  ],
  // Approximate values (≈) are as stated on the slides
  models: [
    { name: "MobileNetV2 + CBAM", kind: "Hybrid attention classifier", accuracy: 0.98, precision: 0.98, recall: 0.98, f1: 0.98, note: "200 test patches" },
    { name: "VGG19", kind: "Transfer learning", accuracy: 0.91, precision: 0.96, recall: 0.84, f1: null, approx: ["accuracy"] },
    { name: "ResNet-50", kind: "Residual network", accuracy: 0.902, precision: 0.9, recall: 0.9, f1: 0.9 },
    { name: "Inception-style CNN", kind: "Multi-scale filters", accuracy: 0.9, precision: 0.92, recall: 0.85, f1: 0.9, approx: ["accuracy", "f1"] },
    { name: "DeepLabV3+", kind: "Pixel-wise segmentation", accuracy: 0.8247, precision: 0.8052, recall: 0.9724, f1: 0.881, note: "23.1M test pixels" }
  ],
  slides: [
    { src: "/research/deeplab-heatmap.webp", title: "DeepLabV3+ risk heatmap", caption: "Water-body context, target mask and the model's pixel-wise malaria-risk map." },
    { src: "/research/vgg19-heatmaps.webp", title: "VGG19 four-panel risk map", caption: "NDWI image, risk heatmap, overlay, and patches above 0.5 probability." },
    { src: "/research/resnet50-contour.webp", title: "ResNet-50 risk contours", caption: "Risk bands from low to very high, with contour lines and probability labels." },
    { src: "/research/hybrid-heatmap.webp", title: "Hybrid model risk grid", caption: "MobileNetV2 + CBAM attention, scoring each patch of the region." },
    { src: "/research/inception-contour.webp", title: "Inception-style CNN contours", caption: "Contour map separating low, moderate, high and very-high-risk zones." },
    { src: "/research/hybrid-report.webp", title: "Hybrid model evaluation", caption: "0.98 accuracy, precision, recall and F1 on the held-out patches." },
    { src: "/research/deeplab-report.webp", title: "DeepLabV3+ evaluation", caption: "Pixel-wise metrics and confusion matrix over 23.1M test pixels." },
    { src: "/research/deeplab-curves.webp", title: "DeepLabV3+ training curves", caption: "Accuracy and loss across 30 epochs for training and validation." }
  ]
};

// Gold-layer explorer under the warehouse case study (3D cube + report page).
// SAMPLE NUMBERS: shaped like the warehouse's sales data, not real query output.
// Replace `sales` with the result of `query` run on the gold views and set sample to false.
const SAMPLE_YEAR = [0.55, 0.85, 1.25, 0.35];     // 2014 is a partial year
const SAMPLE_CATEGORY = [1.0, 0.09, 0.14, 0.32];
const SAMPLE_COUNTRY = [1.0, 0.92, 0.38, 0.33];
export const goldCube = {
  sample: true,
  unit: "$K",
  axes: [
    { name: "Year", values: ["2011", "2012", "2013", "2014"] },
    { name: "Category", values: ["Bikes", "Components", "Clothing", "Accessories"] },
    { name: "Country", values: ["USA", "Australia", "UK", "Germany"] }
  ],
  // sales[year][category][country], in $K
  sales: SAMPLE_YEAR.map((y, yi) =>
    SAMPLE_CATEGORY.map((c, ci) =>
      SAMPLE_COUNTRY.map((k, ki) =>
        Math.round(1400 * y * c * k * (0.85 + ((yi * 7 + ci * 5 + ki * 3) % 6) * 0.06))
      )
    )
  ),
  query: `SELECT YEAR(f.order_date)  AS order_year,
       p.category,
       c.country,
       SUM(f.sales_amount)    AS sales
FROM gold.fact_sales f
JOIN gold.dim_products  p ON p.product_key  = f.product_key
JOIN gold.dim_customers c ON c.customer_key = f.customer_key
GROUP BY YEAR(f.order_date), p.category, c.country;`
};
