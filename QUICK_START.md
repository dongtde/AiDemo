# Quick Start Guide

## Install Dependencies
```bash
npm install
```

## Development Server
```bash
npm run dev
```
Open http://localhost:3000 in your browser

## Build for Production
```bash
npm run build
```

## Preview Production Build
```bash
npm run preview
```

## Project Structure Quick Reference

```
src/
├── assets/           → Static files (images, styles)
├── components/       → Reusable components
├── layouts/          → Page layouts
├── views/            → Route pages
├── stores/           → Pinia stores
├── router/           → Route definitions
├── services/         → API services
├── utils/            → Helper functions
├── mock/             → Mock data
├── plugins/          → Plugin configs (Vuetify)
└── types/            → TypeScript types
```

## Key Features

### Vuetify Components
All Vuetify components are auto-imported:
```vue
<template>
  <v-btn color="primary">Click Me</v-btn>
  <v-card>
    <v-card-title>Title</v-card-title>
  </v-card>
</template>
```

### Path Aliases
Use `@/` for imports from `src/`:
```typescript
import MyComponent from '@/components/MyComponent.vue'
import { useCounterStore } from '@/stores/counter'
```

### Theme Toggle
The app includes a built-in light/dark theme toggle in the navigation bar.

### Material Design Icons
Use MDI icons with the `mdi-` prefix:
```vue
<v-icon>mdi-home</v-icon>
<v-icon>mdi-account</v-icon>
```

## Common Tasks

### Add a New Page
1. Create component in `src/views/`
2. Add route in `src/router/index.ts`

### Add a New Store
1. Create store file in `src/stores/`
2. Import and use: `import { useMyStore } from '@/stores/myStore'`

### Add a Component
1. Create `.vue` file in `src/components/`
2. Import where needed: `import MyComponent from '@/components/MyComponent.vue'`

### Configure Vuetify Theme
Edit `src/plugins/vuetify.ts` to customize:
- Colors
- Breakpoints
- Component defaults
- Icons

## Tips
- TypeScript is configured with strict mode
- All Vuetify components support TypeScript
- Use Composition API with `<script setup>` syntax
- Responsive design is built-in with Vuetify grid
