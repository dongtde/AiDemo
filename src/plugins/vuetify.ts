import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'geek',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
      dark: {
        colors: {
          primary: '#2196F3',
          secondary: '#424242',
          accent: '#FF4081',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
      geek: {
        dark: true,
        colors: {
          background: '#0a0a0a',
          surface: '#111111',
          'surface-variant': '#1a1a1a',
          primary: '#00ff41',
          'primary-darken-1': '#00cc33',
          secondary: '#00ffff',
          'secondary-darken-1': '#00cccc',
          error: '#ff0055',
          info: '#00ccff',
          success: '#00ff88',
          warning: '#ffaa00',
          'on-background': '#00ff41',
          'on-surface': '#00ff41',
          'on-primary': '#000000',
          'on-secondary': '#000000',
        },
      },
    },
  },
  defaults: {
    VBtn: {
      variant: 'elevated',
    },
    VCard: {
      variant: 'elevated',
    },
  },
  display: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})

export default vuetify
