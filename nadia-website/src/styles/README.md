# Styles Architecture

This folder contains modular CSS files organized by component and feature for better maintainability.

## File Structure

### Core Files
- **`index.css`** - Main entry point that imports all style modules
- **`base.css`** - Base app styles, containers, and section layouts

### Component Styles
- **`navigation.css`** - Navbar, logo, and navigation links
- **`buttons.css`** - Button styles (primary, secondary, outline, etc.)
- **`floating-contact.css`** - Floating contact button menu
- **`hero.css`** - Homepage hero section with grid layout

### Section Styles
- **`sections.css`** - Condos, About, Testimonials, Contact, Footer sections

### Properties Feature
- **`properties.css`** - Properties grid, cards, search, and filters
- **`property-modal.css`** - Property detail modal with gallery

### Utilities
- **`animations.css`** - Fade-in animations and filter utilities
- **`responsive.css`** - All media queries and responsive breakpoints

## Import Order

Styles are imported in a specific order in `index.css`:
1. Base & Layout
2. Components
3. Sections
4. Feature-specific (Properties)
5. Utilities & Animations
6. Responsive overrides (last to ensure proper cascade)

## Usage

The entire style system is imported in `App.tsx`:
```tsx
import './styles/index.css';
```

## Maintaining Styles

- **Adding new components**: Create a new file in `src/styles/` and import it in `index.css`
- **Component-specific styles**: Keep related styles together in their dedicated file
- **Responsive design**: Add media queries to `responsive.css`
- **Animations**: Add to `animations.css`

## Benefits

- ✅ **Better organization** - Easy to find and edit specific component styles
- ✅ **Reduced file size** - Individual files are easier to navigate (~100-300 lines each)
- ✅ **Team collaboration** - Multiple developers can work on different style files without conflicts
- ✅ **Maintainability** - Changes are isolated to specific modules
- ✅ **Performance** - Vite automatically optimizes and bundles CSS for production
