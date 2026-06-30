# Curriculum Vitae - Specification

## Project Overview
- **Project name**: Personal CV Website
- **Type**: Single-page responsive website
- **Core functionality**: Display professional resume/CV with interactive sections
- **Target users**: Recruiters, hiring managers, potential clients

## UI/UX Specification

### Layout Structure
- **Header**: Fixed navigation with name/logo and section links
- **Hero**: Full viewport intro with name, title, and tagline
- **About**: Brief professional summary
- **Experience**: Timeline of work history
- **Education**: Academic background
- **Skills**: Visual skill display
- **Contact**: Contact information with interactive elements
- **Footer**: Social links and copyright

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Design

#### Color Palette
- Background (Dark): `#0d0d0d`
- Background (Cards): `#1a1a1a`
- Text Primary: `#f5f5f5`
- Text Secondary: `#a0a0a0`
- Accent Primary: `#e63946` (Crimson Red)
- Accent Secondary: `#ff8fa3` (Soft Pink)
- Border: `#2a2a2a`

#### Typography
- Headings: "Playfair Display", serif (dramatic, editorial feel)
- Body: "Source Sans 3", sans-serif (clean readability)
- Hero Name: 4rem desktop, 2.5rem mobile
- Section Titles: 2rem desktop, 1.5rem mobile
- Body Text: 1rem

#### Spacing System
- Section padding: 80px vertical desktop, 40px mobile
- Card padding: 24px
- Element gaps: 16px

#### Visual Effects
- Box shadows: `0 4px 20px rgba(0,0,0,0.3)`
- Hover transitions: 0.3s ease
- Scroll animations: fade-in on scroll
- Underline animation on links

### Components

#### Navigation
- Sticky header with blur background
- Logo/name on left, nav links on right
- Mobile: hamburger menu with slide-out drawer
- Hover: accent color underline

#### Hero Section
- Large name with subtle text shadow
- Profession title with accent color
- Animated scroll indicator

#### Experience Cards
- Company name, role, date range
- Description list of achievements
- Hover: subtle lift effect

#### Skills Display
- Progress bars for technical skills
- Tag pills for soft skills
- Animated fill on scroll into view

#### Contact Section
- Email with mailto link
- Phone with tel link
- Location
- Social icon links (LinkedIn, GitHub, etc.)

## Functionality Specification

### Core Features
1. Smooth scroll navigation
2. Mobile hamburger menu toggle
3. Scroll-triggered fade-in animations
4. Skill bar animation on scroll
5. Interactive contact links (mailto, tel)
6. Print-friendly styles

### User Interactions
- Click nav links → smooth scroll to section
- Click hamburger → toggle mobile menu
- Scroll into view → trigger animations
- Hover on cards → subtle lift effect

### Edge Cases
- Handle JavaScript disabled (graceful degradation)
- Ensure readable without animations

## Acceptance Criteria
- [ ] Page loads without errors
- [ ] All sections are visible and styled
- [ ] Navigation works (scroll to sections)
- [ ] Mobile menu toggles correctly
- [ ] Animations trigger on scroll
- [ ] Responsive at all breakpoints
- [ ] All text is readable
- [ ] Contact links are functional