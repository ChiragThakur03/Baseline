# Baseline — Tennis Club & Academy

A modern web application for **Baseline Tennis Club & Academy**, showcasing professional coaching, world-class courts, and a thriving community of 9K+ members passionate about tennis.

## Overview

Baseline is a dynamic web platform designed to represent a premier tennis club and academy. Built with cutting-edge web technologies, it provides an engaging digital presence for showcasing facilities, programs, and community events.

## Tech Stack

- **Frontend Framework:** React 18.3 with Vite
- **Build Tool:** Vite 5.4 — lightning-fast development and production builds
- **Styling:** CSS (37.2% of codebase)
- **JavaScript:** 62.1% of codebase
- **Smooth Scrolling:** Lenis for enhanced UX
- **Type Safety:** TypeScript support

## Quick Start

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview

# Run linting
npm run lint
```

The development server will start at `http://localhost:5173`.

## Project Structure

```
Baseline/
├── src/               # React components and application logic
├── index.html         # Main HTML entry point
├── vite.config.js     # Vite configuration
├── package.json       # Project dependencies
└── README.md          # This file
```

## Features

- ✨ Modern, responsive design
- ⚡ Fast performance with Vite
- 🏆 Professional tennis club branding
- 📱 Mobile-optimized experience
- 🎯 Smooth scroll interactions with Lenis

## Landing Page Design

The Baseline landing page is designed to deliver an immediate, polished impression while guiding visitors quickly to the most important actions (book a court, join the academy, or contact the club). Below are the core design decisions and implementation notes.

- Design goals
  - Present a premium, athletic brand that feels energetic and professional.
  - Surface key member actions (bookings, sign-ups) within the first viewport.
  - Maintain fast load times and smooth interactions, especially on mobile.
  - Ensure accessibility and readable information hierarchy.

- Visual layout
  - Hero section: A full-width hero with a large, immersion-style background image or video showing courts and coaching sessions. Overlaid content includes a concise headline, a short subheading, and two primary CTAs ("Book a Court" and "Join the Academy").
  - Feature strips: Horizontal sections to highlight coaching programs, court facilities, membership benefits, and upcoming events. Each strip pairs imagery with a short descriptive card.
  - Court galleries: A responsive image grid showcasing courts, with lightbox-style preview on larger screens.
  - Testimonials & social proof: A rotating carousel or grid with member quotes and logos/figures (e.g., "9K+ members").
  - Footer: Contact details, quick links, social channels, and a compact newsletter sign-up.

- Typography & colors
  - Typeface: Clean, geometric sans-serif for headings, paired with a readable body font for long-form text.
  - Scale: Clear typographic scale with prominent H1/H2 for the hero and concise body text for cards and descriptions.
  - Color palette: A primary accent color (energetic/hot color or club brand color) combined with deep neutrals for contrast and white/soft neutrals for spacing. Accent color is used sparingly for CTAs and interactive elements.

- Imagery & assets
  - Focus on high-quality photography emphasizing motion and coaching moments.
  - Use optimized, responsive images (srcset or picture element) to reduce bandwidth on mobile.
  - Decorative court lines, subtle gradients, or texture can be used to reinforce the brand without distracting from CTAs.

- Interactions & motion
  - Smooth scroll powered by Lenis to provide a polished navigation experience.
  - Subtle entrance animations for cards and images (fade-up with small translate) to draw the eye while preserving performance.
  - Button micro-interactions (scale, color) to reinforce clickability.

- Responsiveness & accessibility
  - Mobile-first layout with stacked sections and prominent touch targets.
  - Keyboard and screen-reader friendly components: semantic HTML, properly labeled buttons/links, and ARIA where necessary.
  - Color contrast and font sizes meet WCAG AA standards for readability.

- Performance considerations
  - Lazy-load offscreen images and defer non-critical scripts.
  - Keep hero media optimized (compressed images or short, autoplay-muted looping video with low bitrate on mobile).
  - Prefetch critical fonts and avoid render-blocking CSS where possible.

- Implementation notes
  - Components: Hero, CTAButton, FeatureCard, ImageGrid, TestimonialCarousel, and Footer.
  - Styling: Scoped CSS modules or a consistent file organization inside `src/components/` to keep styles maintainable.
  - Smooth scroll and animations: Centralized hook or provider (e.g., a Lenis provider) so all sections animate consistently.

This Landing Page design aims to balance brand impact with usability and speed — converting visitors into members while delivering a delightful browsing experience.

## Development

The project uses **Vite** with React and includes ESLint for code quality. Development scripts are configured in `package.json` for easy workflow management.

### Available Commands

| Command | Description |
|---------|------------|
| `npm run dev` | Start local development server |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint code quality checks |

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests to improve the project.


---

**Baseline Tennis Club & Academy** — Where focused coaching meets championship courts.
