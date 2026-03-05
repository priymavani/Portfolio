# Priy Mavani — Portfolio

🌐 **[priymavani.in](https://www.priymavani.in)**

A modern, dark-themed developer portfolio built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. Designed with a sleek, minimal aesthetic featuring glassmorphism panels, smooth scroll-driven animations, and a fully responsive layout from mobile to desktop.

---

## ✨ Features

- **Hero Section** — Cinematic intro with parallax scrolling, profile reveal, and an "Open to Work" status badge
- **Live GitHub & LeetCode Stats** — Real-time contribution graph and problem-solving metrics fetched via API
- **Projects Showcase** — Interactive project cards with live demo links, GitHub repos, Figma designs, and Postman docs
- **Skills Grid** — Categorized tech stack display (Frontend, Backend, Tools, and Other Skills) with animated icons
- **Hackathon Highlights** — Dedicated section with team details, demo links, and project breakdowns
- **Achievements & Certificates** — Verified certifications displayed with credential links
- **Contact Form** — Functional email contact powered by EmailJS
- **Admin Panel** — Protected dashboard to manage portfolio content dynamically via MongoDB
- **SEO Optimized** — Full Open Graph, Twitter Cards, JSON-LD structured data, sitemap, and robots.txt
- **Google Analytics** — Integrated tracking for visitor insights

## 🛠️ Tech Stack

| Layer       | Technologies                                        |
|-------------|-----------------------------------------------------|
| Framework   | Next.js 14 (App Router)                             |
| Styling     | Tailwind CSS, custom glassmorphism design system     |
| Animations  | Framer Motion, Lenis smooth scroll                  |
| Backend     | Next.js API Routes, MongoDB (Mongoose)              |
| Email       | EmailJS                                             |
| Icons       | React Icons, Lucide React                           |
| Deployment  | Vercel                                              |
| Analytics   | Google Analytics (GA4)                              |

## 📂 Project Structure

```
src/
├── app/
│   ├── api/          # API routes (stats, projects, auth, etc.)
│   ├── edit/         # Admin panel pages
│   ├── layout.js     # Root layout with SEO metadata & JSON-LD
│   └── page.js       # Main portfolio page
├── components/
│   ├── Hero.jsx      # Hero section with live stats cards
│   ├── About.jsx     # About me section
│   ├── Projects.jsx  # Project showcase grid
│   ├── Skills.jsx    # Skills categorized display
│   ├── Hackathons.jsx # Hackathon projects
│   ├── Achievements.jsx # Certificates & achievements
│   ├── Contact.jsx   # Contact form
│   ├── Header.jsx    # Navigation header
│   ├── Footer.jsx    # Footer
│   ├── Resume.jsx    # Resume section
│   ├── admin/        # Admin panel components
│   └── ui/           # Reusable UI components
└── models/           # Mongoose schemas
```

## 🔗 Connect

- **GitHub** — [github.com/priymavani](https://github.com/priymavani)
- **LinkedIn** — [linkedin.com/in/priy-mavani](https://www.linkedin.com/in/priy-mavani/)
- **Email** — priy.mavani.cg@gmail.com
