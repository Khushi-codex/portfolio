# Khushi — ML Engineer Portfolio

Personal portfolio website showcasing my machine learning projects, built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

**Live site:** https://khushi-codex.github.io/portfolio/

---

## Overview

I'm a B.Tech CSE (AI & ML) student focused on building complete, end-to-end ML systems — not just models in a notebook, but the full pipeline: data cleaning, model training, a REST API, and a working deployment. This site is where that work lives.

## Features

- **Interactive 3D hero avatar** — a robot that tilts toward your cursor in real 3D (`perspective` + `rotateX`/`rotateY`), with a glow shadow that shifts with it
- **Custom cursor** — a dot + trailing ring that replaces the default cursor on desktop, growing on hover over interactive elements
- **Skills & Expertise grid** — glassmorphism cards with official tech logos, gradient borders, and a staggered scroll-reveal
- **Skills in Action** — a distinct single-column process view that reveals each card as your cursor moves down the section
- **Projects** — glass cards with tech stack, real metrics, and links to live code/demos
- **Education timeline** — alternating left/right timeline with status badges and tags
- **Contact form** — client-side UI only (no backend), with a mock submission flow
- **Scroll-triggered animations** throughout via `IntersectionObserver`
- Fully responsive across desktop and mobile

## Tech Stack

- HTML5, CSS3 (custom properties, glassmorphism, CSS Grid/Flexbox)
- Vanilla JavaScript (no frameworks — `IntersectionObserver`, `requestAnimationFrame` for smooth animation loops)
- [Font Awesome](https://fontawesome.com/) for icons
- [Simple Icons](https://simpleicons.org/) (via CDN) for official tech logos
- Google Fonts (Plus Jakarta Sans)

## Projects Featured

| Project | Stack | Result |
|---|---|---|
| **RetailIQ** | Python, FastAPI, PostgreSQL, Docker | Random Forest sales predictor, R² ≈ 0.90 |
| **Customer Churn Prediction System** | Python, Scikit-learn, FastAPI, Streamlit, Render | 81% accuracy, 0.85 AUC-ROC, deployed live |
| **Personal Expense Analyzer** | Python, Pandas, Matplotlib | Personal finance data pipeline |

Each project's own repository has its full code and README.

## Project Structure

```
portfolio/
├── index.html          # Main page — all sections
├── style.css            # All styling
├── script.js             # Interactivity: scroll reveal, hero tilt, cursor, forms
└── assets/
    ├── pic/
    │   └── robot.png     # Hero avatar
    └── videos/
        └── blackhole.webm  # Background video
```

## Running Locally

No build step — just serve the folder:

```bash
git clone https://github.com/khushi-codex/portfolio.git
cd portfolio
python -m http.server 8000
```

Then open `http://localhost:8000`.

Or just open `index.html` directly in a browser.

## Contact

- **Email:** gupta777khushi@gmail.com
- **LinkedIn:** [linkedin.com/in/khushi-gupta-a641a4388](https://www.linkedin.com/in/khushi-gupta-a641a4388)
- **GitHub:** [github.com/khushi-codex](https://github.com/khushi-codex)

Open to Machine Learning internships and Python development roles.
