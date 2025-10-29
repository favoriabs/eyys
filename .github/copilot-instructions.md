# Copilot Instructions for Eyys (Nuxt.js Project)

## Project Overview
This is a Nuxt.js 4 application using Tailwind CSS 4 with the new Vite plugin architecture. The project follows Nuxt's `app/` directory structure (not the legacy `pages/` structure).

## Key Architecture Decisions

### Nuxt 4 + App Directory Structure
- **Main app entry**: `app/app.vue` - This is the root component, not a pages-based router
- **Assets**: `app/assets/css/main.css` - Global styles with Tailwind imports
- **Public**: `public/` - Static assets served at root level
- **Config**: TypeScript references managed by Nuxt auto-generation in `.nuxt/`

### Styling System
- **Tailwind CSS 4** with Vite plugin (`@tailwindcss/vite`) - NOT the PostCSS plugin
- Import in `nuxt.config.ts` via `vite.plugins` array, not `css` or `postcss` config
- Global CSS: `app/assets/css/main.css` contains only `@import "tailwindcss"`
- Configured in `nuxt.config.ts` css array: `['./app/assets/css/main.css']`

## Development Workflows

### Dev Commands
```bash
npm run dev          # Development server on localhost:3000
npm run build        # Production build
npm run generate     # Static site generation
npm run preview      # Preview production build locally
```

### Key File Patterns
- **Single-file components**: Use `app/app.vue` pattern with template-first structure
- **TypeScript**: Strict TypeScript with Nuxt auto-generated configs (don't edit tsconfig.json directly)
- **Compatibility date**: Set to `2025-07-15` in nuxt.config.ts for stable feature set

## Project-Specific Conventions

### Configuration
- **Nuxt config**: Keep minimal, leverage defaults. Current setup only customizes CSS, devtools, and Tailwind
- **Vite plugins**: Add to `vite.plugins` array in nuxt.config.ts (e.g., Tailwind CSS plugin)
- **Package.json**: Uses ES modules (`"type": "module"`), includes `postinstall: "nuxt prepare"`

### Component Structure
- Currently single `app.vue` root component
- When adding components, use `app/components/` (auto-imported by Nuxt)
- When adding pages, use `app/pages/` (will enable file-based routing)

### Dependencies Management
- **Core stack**: Nuxt 4, Vue 3.5+, Tailwind CSS 4
- **Build tool**: Vite (integrated with Nuxt)
- **Styling**: Tailwind via Vite plugin (not PostCSS)

## Common Tasks

### Adding New Pages
Create `app/pages/` directory and add `.vue` files - Nuxt will auto-generate routing

### Adding Components  
Create `app/components/` directory - components are auto-imported by name

### Styling Updates
- Modify `app/assets/css/main.css` for global styles
- Use Tailwind classes directly in components
- Custom Tailwind config would go in `tailwind.config.js` (not present yet)

### Environment Setup
Run `npm install` then `npm run dev` - the `postinstall` script handles Nuxt preparation automatically.