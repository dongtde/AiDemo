<template>
  <v-layout>
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Vite + Vue 3 + Vuetify</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleTheme">
        <v-icon>{{ theme.global.name.value === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.to"
          link
        >
          <template v-slot:prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app>
      <v-spacer></v-spacer>
      <span>&copy; {{ currentYear }} - Vite + Vue 3 + TypeScript + Vuetify</span>
      <v-spacer></v-spacer>
    </v-footer>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'

const drawer = ref(false)
const theme = useTheme()

const menuItems = [
  { title: 'Home', icon: 'mdi-home', to: '/' },
  { title: 'About', icon: 'mdi-information', to: '/about' },
]

const currentYear = computed(() => new Date().getFullYear())

const toggleTheme = () => {
  theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light'
}
</script>

<style scoped>
</style>
