# Project Structure Guide

## Overview

This document provides detailed information about the project's directory structure and organization.

## Root Directory

```
project/
├── .vscode/              # VSCode workspace settings and recommendations
├── dist/                 # Production build output (generated)
├── node_modules/         # NPM dependencies (generated)
├── public/               # Static assets served at root
├── src/                  # Source code
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── index.html            # Entry HTML file
├── package.json          # NPM package configuration
├── README.md             # Project documentation
├── QUICK_START.md        # Quick start guide
├── STRUCTURE.md          # This file
├── tsconfig.json         # TypeScript configuration
├── tsconfig.node.json    # TypeScript config for Node (Vite)
└── vite.config.ts        # Vite configuration
```

## Source Directory (`src/`)

### `/src/assets/`
Static assets that are imported in code and processed by Vite.

- **`/images/`** - Image files (PNG, JPG, SVG, etc.)
- **`/styles/`** - Global CSS/SCSS files
  - `main.css` - Global styles and utility classes

### `/src/components/`
Reusable Vue components used across the application.

**Examples:**
- `HelloWorld.vue` - Basic component demonstrating props and events
- `UserCard.vue` - Advanced component with computed properties and TypeScript

**Guidelines:**
- Use PascalCase for component names
- Keep components focused and single-purpose
- Use TypeScript interfaces for props
- Document complex components with comments

### `/src/composables/`
Reusable composition functions (Vue 3 Composition API).

**Examples:**
- `useDialog.ts` - Dialog state management
- `useNotification.ts` - Notification/snackbar system

**Guidelines:**
- Prefix composable names with `use`
- Return reactive refs and methods
- Keep composables focused on one responsibility
- Make them framework-agnostic when possible

### `/src/layouts/`
Layout components that wrap page views.

**Examples:**
- `DefaultLayout.vue` - Main layout with app bar, drawer, and footer

**Guidelines:**
- Use layouts for common page structures
- Include navigation, headers, footers
- Use `<router-view />` for content area

### `/src/views/`
Page-level components corresponding to routes.

**Examples:**
- `Home.vue` - Home page
- `About.vue` - About page

**Guidelines:**
- One view per route
- Compose with smaller components from `/components/`
- Handle page-level logic and data fetching

### `/src/stores/`
Pinia store modules for state management.

**Examples:**
- `counter.ts` - Simple counter store
- `user.ts` - User management store with CRUD operations

**Guidelines:**
- Use Composition API style with `defineStore`
- Export typed stores
- Include state, getters (computed), and actions
- Keep stores focused on specific domains

### `/src/router/`
Vue Router configuration and route definitions.

**Files:**
- `index.ts` - Main router configuration

**Guidelines:**
- Group related routes
- Use lazy loading for code splitting
- Define route meta data for auth, titles, etc.

### `/src/services/`
External services and API integrations.

**Examples:**
- `api.ts` - Base API service with HTTP methods

**Guidelines:**
- Abstract external dependencies
- Handle errors consistently
- Use TypeScript for request/response types
- Keep services stateless

### `/src/utils/`
Helper functions and utilities.

**Examples:**
- `helpers.ts` - Common utility functions (formatDate, debounce, etc.)
- `constants.ts` - Application constants

**Guidelines:**
- Pure functions when possible
- Well-typed with TypeScript
- Unit testable
- No side effects

### `/src/mock/`
Mock data for development and testing.

**Examples:**
- `users.ts` - Mock user data

**Guidelines:**
- Use TypeScript interfaces
- Realistic data structures
- Export as constants

### `/src/plugins/`
Plugin configurations and initializations.

**Examples:**
- `vuetify.ts` - Vuetify configuration (theme, icons, etc.)

**Guidelines:**
- One file per plugin
- Export configured plugin instance
- Document configuration options

### `/src/types/`
TypeScript type definitions and interfaces.

**Examples:**
- `index.ts` - Common types used across the app

**Guidelines:**
- Use interfaces for object shapes
- Use type aliases for unions/intersections
- Export all types
- Group related types

### Root Files

**`App.vue`**
- Root Vue component
- Wraps entire application
- Contains `<router-view />`

**`main.ts`**
- Application entry point
- Initializes Vue app
- Registers plugins (Pinia, Router, Vuetify)
- Mounts app to DOM

**`vite-env.d.ts`**
- TypeScript declarations for Vite
- Vue SFC type support

## Public Directory (`public/`)

Files in this directory are served at the root path and not processed by Vite.

**Examples:**
- `vite.svg` - Favicon

**Guidelines:**
- Use for static assets that don't need processing
- Reference with absolute paths (e.g., `/vite.svg`)

## Configuration Files

### `vite.config.ts`
Vite build tool configuration:
- Vue plugin setup
- Vuetify plugin with auto-import
- Path aliases (`@/` → `src/`)
- Dev server settings

### `tsconfig.json`
TypeScript compiler options:
- Strict mode enabled
- Path aliases
- Module resolution
- Target ES2020

### `package.json`
NPM package configuration:
- Dependencies
- Dev dependencies
- Scripts (dev, build, preview)
- Project metadata

## Best Practices

### File Naming
- **Components**: PascalCase (e.g., `UserCard.vue`)
- **Composables**: camelCase with `use` prefix (e.g., `useDialog.ts`)
- **Stores**: camelCase (e.g., `user.ts`)
- **Utilities**: camelCase (e.g., `helpers.ts`)
- **Types**: camelCase (e.g., `index.ts`)

### Import Order
1. Vue core imports
2. Third-party libraries
3. Type imports
4. Local components
5. Composables
6. Stores
7. Utils/constants

### Component Organization
```vue
<template>
  <!-- Template -->
</template>

<script setup lang="ts">
// Imports
// Types/Interfaces
// Props/Emits
// Reactive state
// Computed properties
// Methods
// Lifecycle hooks
</script>

<style scoped>
/* Styles */
</style>
```

## Adding New Features

### New Page
1. Create view component in `src/views/`
2. Add route in `src/router/index.ts`
3. Add navigation item if needed

### New Component
1. Create `.vue` file in `src/components/`
2. Define TypeScript interfaces for props
3. Use Composition API with `<script setup>`

### New Store
1. Create `.ts` file in `src/stores/`
2. Use `defineStore` with Composition API
3. Export typed store

### New API Service
1. Create or extend service in `src/services/`
2. Define TypeScript interfaces for responses
3. Handle errors appropriately

### New Utility
1. Add function to `src/utils/helpers.ts` or create new file
2. Add TypeScript types
3. Export function

### New Composable
1. Create `.ts` file in `src/composables/`
2. Prefix name with `use`
3. Return reactive state and methods
4. Add TypeScript types
