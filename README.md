<div align="center">

<h1>
  <img src="https://readme-typing-svg.demolab.com?font=Orbitron&weight=900&size=38&duration=3000&pause=1000&color=16A34A&center=true&vCenter=true&width=700&lines=E-SARKARI+REHNUMA;%D8%A7%DB%8C-%D8%B3%D8%B1%DA%A9%D8%A7%D8%B1%DB%8C+%D8%B1%DB%81%D9%86%D9%85%D8%A7" alt="E-SARKARI REHNUMA" />
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Live-16A34A?style=for-the-badge&labelColor=0a0f0a" />
  <img src="https://img.shields.io/badge/React-TypeScript-16A34A?style=for-the-badge&logo=react&logoColor=white&labelColor=0a0f0a" />
  <img src="https://img.shields.io/badge/Node.js-Express-16A34A?style=for-the-badge&logo=node.js&logoColor=white&labelColor=0a0f0a" />
  <img src="https://img.shields.io/badge/PostgreSQL-Drizzle_ORM-16A34A?style=for-the-badge&logo=postgresql&logoColor=white&labelColor=0a0f0a" />
  <img src="https://img.shields.io/badge/Region-Karachi,_Sindh-16A34A?style=for-the-badge&labelColor=0a0f0a" />
</p>

<p align="center">
  <strong>An AI-Powered Accessibility Framework for Public Service Navigation in Pakistan</strong><br/>
  <sub>Bridging the digital divide — one citizen at a time.</sub>
</p>

<br/>

> *"Essential services should be accessible to every citizen, regardless of literacy, language, or technological proficiency."*

<br/>

<a href="https://e-sarkari-rehnuma.onrender.com/">
  <img src="https://img.shields.io/badge/◈ VIEW LIVE DEMO-16A34A?style=for-the-badge&labelColor=0a0f0a&logoColor=white" />
</a>

<br/><br/>

</div>

---

## ◈ Overview

**E-Sarkari Rehnuma** *(ای-سرکاری رہنما)* is a specialized civic-tech ecosystem engineered to dismantle the barriers between Pakistani citizens and their public services. Built with an uncompromising focus on **inclusive design**, the platform simplifies complex bureaucratic and medical procedures through a bilingual, voice-first interface — purpose-built for elderly users, low-literacy demographics, and anyone navigating Pakistan's public sector for the first time.

This is not a directory. This is an **intelligent guidance system**.

---

## ◈ Core Capabilities

| Feature | Description |
|---|---|
| **Voice Ecosystem** | Bilingual TTS with adjustable playback speeds and voice-to-text input |
| **Symptom Checker** | Algorithmic routing to correct medical departments based on reported symptoms |
| **Hospital Registry** | Verified data for Karachi's top public and private healthcare institutions |
| **District Intelligence** | Precision mapping of user location to relevant Deputy Commissioner (DC) offices |
| **Document Suitcase** | Dynamic checklists and "Mistakes to Avoid" modules for full office readiness |
| **WhatsApp Bridge** | Instant sharing of procedural guides and document lists for community support |
| **Elderly Mode UX** | High-focus mode — enlarged typography, single-step wizard to eliminate cognitive overload |
| **Global Emergency Utility** | Persistent footer with Edhi (115), Police (15), and Rescue (1122) for crisis response |

---

## ◈ Technical Architecture

### ▸ Frontend Engineering

```
Framework     →  React.js + TypeScript
Styling       →  Tailwind CSS  [ Custom "Institutional Glassmorphism" Theme ]
Animations    →  Framer Motion  [ State-driven UI transitions ]
Iconography   →  Lucide React   [ Standardized SVG icon system ]
Typography    →  Urdu Nastaliq  [ RTL-first bilingual rendering ]
```

### ▸ Backend & Intelligence

```
Server        →  Node.js + Express REST API
Database      →  PostgreSQL + Drizzle ORM  [ Relational mapping ]
Accessibility →  Web Speech API  [ Real-time synthesis & recognition ]
Data Pipeline →  Automated CSV-to-SQL Seeding Engine
```

---

## ◈ How It Works

```
User Input (Voice or Text)
       │
       ▼
  Keyword Scanning Engine
       │
       ├──▶  Service Identified  ──▶  Step-by-step guidance
       │
       ├──▶  Medical Symptom    ──▶  Department routing
       │
       ├──▶  Location Query     ──▶  DC Office mapping
       │
       └──▶  Document Needed    ──▶  Dynamic checklist + WhatsApp share
```

**The Core** — Scans voice/text input for keywords and routes to relevant guidance instantly.

**The Seeder** — Data managed via `services.csv` and `steps.csv`, allowing the platform to scale to hundreds of services without code changes.

**The UX** — Large touch targets, audio-first feedback loops, and Urdu support minimize procedural anxiety for first-time users.

---

## ◈ Mobile-First Engineering

Recognizing that **90% of users** interact with civic services while in the field, every design decision prioritizes mobile reality:

- **Thumb-Friendly Navigation** — Optimized touch targets for one-handed use in crowded environments
- **Low-Bandwidth Optimization** — Engineered to perform reliably on 3G/4G mobile data
- **Field Utility** — Persistent emergency numbers and WhatsApp sharing for real-time coordination
- **Offline Resilience** — Core guidance accessible without a stable connection

---

## ◈ Accessibility Commitment

E-Sarkari Rehnuma treats accessibility as architecture, not afterthought:

- **Urdu Nastaliq Typography** — Right-to-left rendering for native language comfort
- **High-Contrast Visuals** — WCAG-compliant contrast ratios throughout
- **Universal Voice Support** — Full TTS and STT in both Urdu and English
- **Elderly Mode** — Single-step wizard interface that removes all visual complexity
- **Zero Tech Proficiency Required** — Designed so that anyone who can speak can use it

---

## ◈ Getting Started

### Prerequisites
- Node.js `18+`
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Jawad-o0/e-sarkari-rehnuma.git

# Navigate into the project
cd e-sarkari-rehnuma

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Seed the database
npm run seed

# Start the development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

---

## ◈ Project Structure

```
├── client/                  # React + TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-level page components
│   │   ├── hooks/           # Custom React hooks
│   │   └── lib/             # Utility functions
├── server/                  # Node.js + Express backend
│   ├── routes/              # API route handlers
│   ├── db/                  # Database schema + Drizzle config
│   └── seed/                # CSV-to-SQL seeding engine
│       ├── services.csv     # Service definitions
│       └── steps.csv        # Step-by-step guidance data
└── shared/                  # Shared types between client/server
```

---

## ◈ Live Deployment

| Property | Detail |
|---|---|
| **Platform** | Render |
| **Region** | Karachi, Sindh, Pakistan |
| **URL** | [e-sarkari-rehnuma.onrender.com](https://e-sarkari-rehnuma.onrender.com/) |
| **Status** | Live |

---

## ◈ License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

<br/>

**Built by [Jawad Ali](https://github.com/Jawad-o0)**

<a href="https://github.com/Jawad-o0">
  <img src="https://img.shields.io/badge/GitHub-Jawad--o0-16A34A?style=for-the-badge&logo=github&logoColor=white&labelColor=0a0f0a" />
</a>
<a href="https://www.linkedin.com/in/jawad-ali-677aa6346">
  <img src="https://img.shields.io/badge/LinkedIn-Jawad_Ali-16A34A?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=0a0f0a" />
</a>
<a href="mailto:Jawadaliii986@gmail.com">
  <img src="https://img.shields.io/badge/Email-Jawadaliii986@gmail.com-16A34A?style=for-the-badge&logo=gmail&logoColor=white&labelColor=0a0f0a" />
</a>

<br/><br/>

<sub>© 2026 E-Sarkari Rehnuma • Civic Technology for Pakistan</sub>

</div>
