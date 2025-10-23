# Vite 5 + Vue 3 + TypeScript + Vuetify 3 Application

A modern, fully-configured Vue 3 application starter template built with Vite 5, TypeScript, Vuetify 3, Pinia, and Vue Router.

## 🚀 Features

- ⚡️ **Vite 5** - Lightning-fast HMR and optimized builds
- 🖖 **Vue 3** - Composition API, `<script setup>` syntax
- 🔷 **TypeScript** - Type safety and better developer experience
- 🎨 **Vuetify 3** - Material Design component framework
- 🗂 **Vue Router 4** - Official routing solution
- 📦 **Pinia** - Intuitive state management
- 🎯 **Path Aliases** - `@/` prefix for cleaner imports

## 📁 Project Structure

```
src/
├── assets/           # Static assets (images, styles, fonts)
│   ├── images/      # Image files
│   └── styles/      # Global CSS styles
├── components/      # Reusable Vue components
├── composables/     # Vue composables (reusable composition functions)
├── layouts/         # Layout components (DefaultLayout, etc.)
├── views/           # Page-level components
├── stores/          # Pinia store modules
├── services/        # API services and external integrations
├── utils/           # Utility functions and helpers
├── mock/            # Mock data for development
├── plugins/         # Plugin configurations (Vuetify, etc.)
├── router/          # Vue Router configuration
├── types/           # TypeScript type definitions
├── App.vue          # Root component
├── main.ts          # Application entry point
└── vite-env.d.ts    # TypeScript declarations
```

## 🛠️ Tech Stack

- **Vite**: ^5.4.21
- **Vue**: ^3.5.22
- **TypeScript**: ^5.9.3
- **Vuetify**: ^3.10.7
- **Vue Router**: ^4.6.3
- **Pinia**: ^3.0.3
- **Material Design Icons**: @mdi/font

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn or pnpm

## 🚦 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

Build for production:
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview

Preview the production build:
```bash
npm run preview
```

## 🎨 Vuetify Configuration

### Theme

The Vuetify theme is configured in `src/plugins/vuetify.ts` with custom colors for both light and dark modes:

**Light Theme:**
- Primary: `#1976D2`
- Secondary: `#424242`
- Accent: `#82B1FF`
- Error: `#FF5252`
- Info: `#2196F3`
- Success: `#4CAF50`
- Warning: `#FB8C00`

**Dark Theme:**
- Primary: `#2196F3`
- Secondary: `#424242`
- Accent: `#FF4081`

### Icons

Material Design Icons (MDI) are configured as the default icon set. Use icons with the `mdi-` prefix:

```vue
<v-icon>mdi-home</v-icon>
```

### Breakpoints

Custom responsive breakpoints are configured:

- **xs**: 0px
- **sm**: 600px
- **md**: 960px
- **lg**: 1280px
- **xl**: 1920px

### Component Defaults

Default component variants are set in the Vuetify configuration:
- VBtn: `variant="elevated"`
- VCard: `variant="elevated"`

## 🗺️ Routing

Routes are defined in `src/router/index.ts`. The application uses a nested layout structure with the `DefaultLayout` component wrapping child routes.

Example route structure:
```typescript
{
  path: '/',
  component: DefaultLayout,
  children: [
    { path: '', name: 'Home', component: Home },
    { path: 'about', name: 'About', component: About },
  ]
}
```

## 📦 State Management

Pinia stores are located in `src/stores/`. Example store usage:

```typescript
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
counter.increment()
```

## 🧩 Components

### Layouts

- **DefaultLayout**: Base layout with app bar, navigation drawer, and footer

### Views

- **Home**: Landing page with technology showcase
- **About**: Information about the project structure

### Example Component

A sample `HelloWorld` component is provided in `src/components/` demonstrating:
- TypeScript props with `defineProps`
- Event emitting with `defineEmits`
- Composition API with `<script setup>`

## 🔧 Utilities

### Helper Functions

Located in `src/utils/helpers.ts`:
- `formatDate()` - Format dates for display
- `debounce()` - Debounce function calls
- `capitalize()` - Capitalize strings

### API Service

A base API service class is available in `src/services/api.ts` for making HTTP requests.

## 📝 TypeScript Configuration

The project includes strict TypeScript configuration with:
- Path aliases (`@/` -> `src/`)
- Strict mode enabled
- Unused variables and parameters checking
- Proper module resolution

## 🎯 Development Tips

1. **Path Aliases**: Use `@/` prefix for imports from the `src/` directory
   ```typescript
   import MyComponent from '@/components/MyComponent.vue'
   ```

2. **Theme Switching**: The default layout includes a theme toggle button in the app bar

3. **Responsive Design**: Use Vuetify's responsive grid system and breakpoint helpers

4. **Type Safety**: Leverage TypeScript interfaces for props, store states, and API responses

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure TypeScript compilation passes: `npm run build`
4. Submit a pull request

## 📄 License

ISC License

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/)
- [Vue.js](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
