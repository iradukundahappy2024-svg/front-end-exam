# Youth Empowerment Rwanda — Project Documentation Report

**Project Title:** Youth Empowerment Rwanda (YER) — Official Website  
**Developer:** Front-End Developer (Individual Assignment)  
**Submission Date:** 2024  
**Technology Stack:** HTML5, CSS3, Vanilla JavaScript

---

## 1. Website Purpose

Youth Empowerment Rwanda (YER) is a fictional non-governmental organization (NGO) dedicated to empowering young Rwandans aged 15–35 through education, skills training, mentorship, and community development programs.

The website serves as the organization's official digital presence, enabling it to:
- Communicate its mission, vision, programs, and impact to the public
- Allow youth to learn about and apply for free training programs
- Showcase success stories, news, and gallery content
- Accept partnership, volunteer, and donation inquiries
- Project a professional, trustworthy brand image to donors and government partners

---

## 2. Pages Included (6 Pages)

| Page | File | Purpose |
|------|------|---------|
| Home | index.html | Landing page with hero, stats, programs overview, testimonials |
| About Us | about.html | Organization story, mission, team, values, timeline, partners |
| Programs | programs.html | Detailed tab-based view of all 6 programs |
| Gallery | gallery.html | Filterable photo gallery with lightbox viewer |
| Blog/News | blog.html | News articles, featured posts, sidebar with clock |
| Contact | contact.html | Contact form with validation, FAQ accordion, map |

---

## 3. Tools & Technologies Used

### Languages
- **HTML5** — Semantic structure with elements: `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`, `<main>`, `<aside>`
- **CSS3** — Styling, animations, transitions, responsive layouts
- **JavaScript (ES6+)** — Interactivity and dynamic behavior

### External Libraries (CDN)
- **Google Fonts** — `Playfair Display` (display/headings) and `DM Sans` (body text)
- **Font Awesome 6.5** — Icons throughout the website

### Design Approach
- **CSS Custom Properties (Variables)** — Used for theming (dark/light mode switch)
- **CSS Grid & Flexbox** — Used for all layouts
- **Mobile-first responsive design** — Breakpoints at 480px, 768px, 1024px
- **Intersection Observer API** — For scroll-reveal animations
- **localStorage** — Persists user's dark/light mode preference across sessions
- **sessionStorage** — Prevents welcome modal from re-appearing in the same session

---

## 4. Key Features Implemented

### HTML5 Structure
- Full semantic HTML across all 6 pages
- Consistent navigation with active state
- Accessible `aria-label` attributes on buttons
- Proper heading hierarchy (h1 → h6)
- Meta viewport and charset tags on all pages

### CSS3 Styling
- Responsive design working on mobile, tablet, and desktop
- CSS Variables for consistent color and spacing system
- Dark/Light mode via `[data-theme="dark"]` CSS selector
- Hover effects and smooth transitions (`cubic-bezier` easing)
- CSS `@keyframes` animations (hero zoom, fade-up entrance, marquee scroll)
- Sticky navigation bar that changes style on scroll
- Gradient overlays, backdrop blur effects, and layered imagery
- Professional card components with box shadows and border effects

### JavaScript Interactivity (8+ Features)

1. **🍔 Hamburger/Mobile Navigation Menu**  
   Animated hamburger icon → full-screen mobile menu with smooth open/close transitions

2. **🌙 Dark/Light Mode Toggle**  
   Theme persists via `localStorage` with icon change (moon ↔ sun)

3. **📋 Form Validation (Contact Page)**  
   Real-time validation on blur and submit; validates required fields, email format, phone format, minimum length; shows inline error messages; disables submit button during "sending"; shows success message on completion

4. **🖼️ Image Slider / Testimonials Carousel (Home Page)**  
   3-slide testimonial carousel with previous/next buttons, dot indicators, auto-play (5s), and fade animation

5. **💬 Welcome Modal Popup (Home Page)**  
   Auto-opens after 2.5 seconds; only appears once per session using `sessionStorage`; closeable with ✕, "Maybe Later" button, overlay click, or Escape key

6. **🔢 Animated Statistics Counter (Home Page)**  
   Uses `IntersectionObserver` to trigger counter animation when stats enter viewport

7. **🎨 Gallery Filter + Lightbox (Gallery Page)**  
   Category-based photo filtering; click to open full-screen lightbox with prev/next navigation and keyboard arrow key support

8. **📑 Program Tabs (Programs Page)**  
   Tab-based content switching for 6 programs without page reload

9. **⬆️ Back-to-Top Button**  
   Appears after scrolling 400px; smooth scroll to top

10. **🕒 Real-Time Clock + Dynamic Greeting (Blog Page)**  
    Live clock updates every second; greeting changes based on time of day (Morning/Afternoon/Evening/Night)

11. **❓ FAQ Accordion (Contact Page)**  
    Click-to-expand with only one item open at a time; smooth max-height animation

12. **✨ Scroll Reveal Animations**  
    `IntersectionObserver` triggers fade-up reveal for cards and grid items with staggered delay

---

## 5. Responsive Design Breakpoints

| Breakpoint | Target Devices |
|------------|----------------|
| < 480px | Small phones |
| < 768px | Phones and small tablets |
| < 1024px | Tablets |
| ≥ 1024px | Desktop & large screens |

Key responsive changes:
- Navigation collapses to hamburger menu on mobile
- Multi-column grids stack to single column on small screens
- Font sizes use `clamp()` for fluid typography
- Image stacking layouts adapt on tablets

---

## 6. Design System

| Element | Value |
|---------|-------|
| Primary Color | `#16A34A` (Rwanda Green) |
| Accent Color | `#F59E0B` (Warm Gold) |
| Display Font | Playfair Display (serif) |
| Body Font | DM Sans (sans-serif) |
| Border Radius | 12px (cards), 20px (large cards), 50px (buttons/pills) |
| Transition | `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` |

---

## 7. Challenges Faced & Solutions

### Challenge 1: Sticky Navbar Transparency
**Problem:** The fixed navbar needed to be transparent on the hero and opaque on scroll — but the white logo text became invisible over white backgrounds when scrolled.  
**Solution:** Used a `.scrolled` CSS class toggled by a JavaScript `scroll` event listener. The class changes background, padding, and text colors via CSS.

### Challenge 2: Gallery Filter + Lightbox Interaction
**Problem:** After filtering, the lightbox needed to navigate only through *currently visible* images, not all images.  
**Solution:** Built the lightbox to dynamically query `document.querySelectorAll('.gallery-item:not([style*="none"])')` at open time, creating a fresh visible-items array on each invocation.

### Challenge 3: Dark Mode Persistence
**Problem:** Page reloads reset the theme to light mode, causing a flash of wrong theme.  
**Solution:** Applied `localStorage.getItem('yer-theme')` at DOM load in `main.js`, before any rendering, and set `document.documentElement.setAttribute('data-theme', ...)` immediately.

### Challenge 4: Responsive Typography
**Problem:** Large display fonts looked too big on mobile and too small on large screens if set with fixed `px` values.  
**Solution:** Used CSS `clamp()` — e.g., `clamp(2rem, 5vw, 4rem)` — for fluid font sizes that scale smoothly between breakpoints without media queries.

### Challenge 5: Modal Showing Every Reload
**Problem:** The welcome modal re-appeared on every page load, which would be annoying for returning visitors.  
**Solution:** Used `sessionStorage` to set a flag after the first modal display in a session. The modal only shows if the flag is absent.

---

## 8. File Structure

```
youth-empowerment/
├── index.html          ← Home page
├── about.html          ← About Us page
├── programs.html       ← Programs page
├── gallery.html        ← Gallery page
├── blog.html           ← Blog/News page
├── contact.html        ← Contact page
├── css/
│   ├── style.css       ← Global styles (navbar, footer, buttons, utilities)
│   └── home.css        ← Home page specific styles
├── js/
│   ├── main.js         ← Shared JS (navbar, theme, back-to-top, scroll reveal)
│   └── home.js         ← Home page JS (counter, slider, modal)
└── REPORT.md           ← This documentation
```

---

## 9. Code Quality

- All HTML files use consistent indentation and comments
- CSS is organized by component with clear section headers
- JavaScript uses `const`/`let`, arrow functions, and modern ES6+ syntax
- No inline JavaScript (except small page-specific scripts in `<script>` tags)
- Accessible: semantic HTML, ARIA labels, keyboard navigation support

---

*This project was developed as an original work for the Front-End Web Development assignment. All images are sourced from Unsplash (free to use). Icons from Font Awesome. Fonts from Google Fonts.*
