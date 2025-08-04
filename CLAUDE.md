# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run lint` - Run ESLint with React-specific rules
- `npm run preview` - Preview production build locally

## Project Architecture

This is a React + Vite frontend application for Popular Diagnostic Centre Limited (PDCL), a medical diagnostic service provider in Bangladesh.

### Tech Stack
- **Framework**: React 18 with Vite build tool
- **Routing**: React Router DOM v6 with lazy loading
- **Styling**: Tailwind CSS with custom PDCL branding
- **Animations**: Framer Motion for smooth transitions
- **HTTP Client**: Axios for API communication
- **State Management**: React hooks (useState, useEffect)
- **UI Components**: Material Tailwind, Headless UI

### Key Architecture Patterns

**Lazy Loading**: All route components use React.lazy() for code splitting and performance optimization. The main entry point (`src/main.jsx`) implements a centralized lazy loading system.

**Component Organization**:
- `/src/components/` - Reusable UI components and page components
- `/src/components/Branch/` - Individual branch-specific pages (22+ locations)
- `/src/constants/` - Static data and configuration (large file ~1.1MB)
- `/src/assets/` - Organized by type (DoctorImage, HeroImages, Logos, etc.)

**API Integration**: The app communicates with `https://api.populardiagnostic.com/api/` for:
- Doctor listings and profiles
- Branch information and services
- Report downloads and patient portal features

**Branch System**: Each PDCL branch has its own dedicated page component with:
- Hero video section
- Doctor listings with pagination
- Service search functionality
- Branch-specific contact information

### Environment Configuration
- Uses Vite environment variables (`VITE_BASE_URL`, `VITE_API_TOKEN`)
- Configuration stored in `src/secrets.js`

### Custom Styling
- PDCL brand colors: `#006642` (primary green), `#00984a` (hover state)
- Custom Tailwind utilities for gradient text animations
- Responsive design with mobile-first approach
- Custom animations: blob, upDown, gradient flows

### Performance Optimizations
- Vite build configuration with tree shaking enabled
- Lazy loading for all major components
- Image optimization with WebP format
- Component-level code splitting

### Routing Structure
- Root layout with persistent navigation (Nav, Navbar, Footer, Sidemenu)
- Nested routing for branches and services
- Error boundary with custom Error component
- ScrollToTop component for navigation

### Notable Components
- `SearchBoxBranch` - Branch-specific service search
- `DoctorSearch` - Doctor finder with specialization filters  
- `ReportDownload` - Patient portal for downloading reports
- `ChatWidget` - Customer support integration
- `FacebookChat` - Social media integration

The codebase follows React best practices with functional components, hooks, and modern ES6+ syntax. The large constants file suggests extensive static data for branch information, doctor profiles, and service listings.