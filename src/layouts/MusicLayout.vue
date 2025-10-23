<template>
  <v-app>
    <v-app-bar color="surface" flat height="70" class="geek-border-bottom">
      <v-app-bar-nav-icon @click="drawer = !drawer" color="primary"></v-app-bar-nav-icon>
      
      <v-toolbar-title class="geek-text font-weight-bold ml-2">
        <v-icon color="primary" size="small" class="mr-2">mdi-music-circle</v-icon>
        <span class="glow-text">GEEK.MUSIC</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field
        density="compact"
        variant="outlined"
        placeholder="Search tracks, artists, albums..."
        prepend-inner-icon="mdi-magnify"
        color="primary"
        class="mx-4 search-field"
        style="max-width: 400px"
        hide-details
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn icon @click="toggleTheme" variant="text">
        <v-icon color="primary">{{ getThemeIcon }}</v-icon>
      </v-btn>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" variant="text">
            <v-icon color="primary">mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/profile">
            <template v-slot:prepend>
              <v-icon color="primary">mdi-account</v-icon>
            </template>
            <v-list-item-title class="geek-text">Profile</v-list-item-title>
          </v-list-item>
          <v-list-item to="/settings">
            <template v-slot:prepend>
              <v-icon color="primary">mdi-cog</v-icon>
            </template>
            <v-list-item-title class="geek-text">Settings</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="handleLogout">
            <template v-slot:prepend>
              <v-icon color="error">mdi-logout</v-icon>
            </template>
            <v-list-item-title style="color: #ff0055">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list nav class="py-4">
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.to"
          link
          class="my-1"
        >
          <template v-slot:prepend>
            <v-icon :color="item.color || 'primary'">{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title class="geek-text">{{ item.title }}</v-list-item-title>
        </v-list-item>

        <v-divider class="my-4" color="primary" style="opacity: 0.3"></v-divider>

        <v-list-subheader class="geek-text">PLAYLISTS</v-list-subheader>
        <v-list-item
          v-for="playlist in userPlaylists"
          :key="playlist.id"
          :to="`/playlist/${playlist.id}`"
          link
          class="my-1"
        >
          <template v-slot:prepend>
            <v-icon color="secondary">mdi-playlist-music</v-icon>
          </template>
          <v-list-item-title class="geek-text">{{ playlist.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
      <lyrics-panel />
    </v-main>

    <music-player />
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'
import { useMusicStore } from '@/stores/music'
import { useUserStore } from '@/stores/user'
import MusicPlayer from '@/components/MusicPlayer.vue'
import LyricsPanel from '@/components/LyricsPanel.vue'

const drawer = ref(false)
const theme = useTheme()
const musicStore = useMusicStore()
const userStore = useUserStore()

const menuItems = [
  { title: 'Home', icon: 'mdi-home', to: '/', color: 'primary' },
  { title: 'Discover', icon: 'mdi-compass', to: '/discover', color: 'primary' },
  { title: 'Library', icon: 'mdi-library-music', to: '/library', color: 'primary' },
  { title: 'Social', icon: 'mdi-account-group', to: '/social', color: 'primary' },
  { title: 'Settings', icon: 'mdi-cog', to: '/settings', color: 'primary' },
  { title: 'Playlists', icon: 'mdi-playlist-play', to: '/playlists', color: 'secondary' },
  { title: 'Artists', icon: 'mdi-account-music', to: '/artists', color: 'secondary' },
  { title: 'Albums', icon: 'mdi-album', to: '/albums', color: 'secondary' },
  { title: 'Ranks', icon: 'mdi-chart-line', to: '/ranks', color: 'warning' },
  { title: 'MVs', icon: 'mdi-video', to: '/mvs', color: 'warning' },
]

const userPlaylists = computed(() => musicStore.playlists.slice(0, 5))

const getThemeIcon = computed(() => {
  if (theme.global.name.value === 'geek') return 'mdi-console'
  if (theme.global.name.value === 'dark') return 'mdi-weather-night'
  return 'mdi-weather-sunny'
})

function toggleTheme() {
  const themes = ['geek', 'dark', 'light']
  const currentIndex = themes.indexOf(theme.global.name.value)
  const nextIndex = (currentIndex + 1) % themes.length
  theme.global.name.value = themes[nextIndex]
}

function handleLogout() {
  userStore.logout()
}
</script>

<style scoped>
.geek-border-bottom {
  border-bottom: 1px solid rgba(0, 255, 65, 0.3);
  box-shadow: 0 2px 10px rgba(0, 255, 65, 0.1);
}

:deep(.search-field .v-field) {
  border-color: rgba(0, 255, 65, 0.3);
}

:deep(.search-field .v-field:hover) {
  border-color: #00ff41;
}
</style>
