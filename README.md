# Manasi Patil — Portfolio

Single-page portfolio for data engineering and analytics roles, built with React, Vite, Tailwind CSS, GSAP and Lenis. The visual style is editorial: warm ivory paper, deep blue type and coral accents.

## Page structure

| Section | Component | What it shows |
|---|---|---|
| Hero | `hero/HeroSection.jsx` | Role focus, headline, short intro, availability, CGPA strip |
| 01 Projects | `projects/ProjectsSection.jsx` | Case studies: problem, outcome, data-flow diagram (`ArchitectureFlow.jsx`), what I built, design choices, stack, repo link |
| 02 Experience | `experience/ExperienceSection.jsx` | Timeline of internships |
| 03 Skills | `skills/SkillsSection.jsx` | Each skill linked to the project or role where it was used |
| 04 Education | `education/EducationSection.jsx` | Degree, honours, certifications |
| Contact | `contact/ContactSection.jsx` | Email, LinkedIn, GitHub, LeetCode, resume |
| Resume | `ui/ResumeModal.jsx` | Printable resume; shows a PDF download button when `resumePdfUrl` is set |

## Editing content

Everything shown on the site lives in [`src/data/resumeData.js`](src/data/resumeData.js):

- `personalInfo` — contact links, `availability`, and `resumePdfUrl` (put the PDF in `public/` and set e.g. `"/Manasi_Patil_Resume.pdf"`).
- `projectsData` — per project: `githubUrl` (or `null` plus `repoNote`), `architecture` stages, `decisions`, and `codeSnippets` (`{ title, code }`; the "From the code" block only appears when this has entries).
- `skillEvidence`, `evidenceLabels`, `otherSkills` — the Skills section. Evidence ids match anchors on the page (`project-<id>`, `exp-<id>`, `education`).
- `experienceData`, `educationData`, `certificationsData`.

Keep every claim traceable to real work; leave a field out rather than filling it with placeholder numbers.

## Development

```bash
npm run dev      # start the dev server on http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

`scripts/makeTransparent.js` regenerates `public/images/coral_rose_transparent.png` (and its `.webp` copy) from the source image in `design-assets/` (needs the `sharp` dev dependency).

### Resume PDF

`resume/resume.html` is the source of the one-page resume (Computer Modern fonts in `resume/fonts/`). After editing it, rebuild the PDF the site serves:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer \
  --print-to-pdf=public/Manasi_Patil_Resume.pdf "file://$PWD/resume/resume.html"
```

Check that it is still one page before committing.

`scripts/makeOgImage.js` rebuilds `public/og-cover.png`, the 1200×630 link-preview image.

`_archive/` holds retired components that are not part of the site; it is git-ignored and safe to delete.
