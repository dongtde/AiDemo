<template>
  <div class="playlist-hub pa-6">
    <div class="terminal-header mb-6">
      <div class="geek-text glow-text">&gt; PLAYLIST_DATABASE_ONLINE</div>
    </div>

    <v-tabs v-model="activeTab" color="primary" class="mb-6 geek-tabs">
      <v-tab value="featured" class="geek-text">FEATURED</v-tab>
      <v-tab value="trending" class="geek-text">TRENDING</v-tab>
      <v-tab value="my-playlists" class="geek-text">MY_PLAYLISTS</v-tab>
    </v-tabs>

    <v-row>
      <v-col v-for="playlist in displayedPlaylists" :key="playlist.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="geek-card" @click="goToPlaylist(playlist.id)">
          <v-img :src="playlist.coverUrl" aspect-ratio="1" class="geek-border">
            <v-overlay contained class="align-center justify-center">
              <v-btn icon color="primary" size="large">
                <v-icon size="x-large">mdi-playlist-play</v-icon>
              </v-btn>
            </v-overlay>
          </v-img>
          <v-card-text>
            <div class="text-subtitle-1 geek-text text-truncate">{{ playlist.name }}</div>
            <div class="text-caption" style="color: #00ffff">by {{ playlist.creatorName }}</div>
            <div class="d-flex justify-space-between align-center mt-3">
              <div class="text-caption geek-text">
                <v-icon size="x-small" color="primary">mdi-music-note</v-icon>
                {{ playlist.songs.length }}
              </div>
              <div class="text-caption geek-text">
                <v-icon size="x-small" color="primary">mdi-play</v-icon>
                {{ formatPlayCount(playlist.playCount) }}
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMusicStore } from '@/stores/music'

const router = useRouter()
const musicStore = useMusicStore()
const activeTab = ref('featured')

const displayedPlaylists = computed(() => {
  switch (activeTab.value) {
    case 'featured':
    case 'trending':
      return musicStore.hotPlaylists
    case 'my-playlists':
      return musicStore.playlists
    default:
      return musicStore.playlists
  }
})

function goToPlaylist(id: string) {
  router.push(`/playlist/${id}`)
}

function formatPlayCount(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
}
</script>

<style scoped>
.playlist-hub {
  min-height: calc(100vh - 160px);
}

.terminal-header {
  font-family: 'Share Tech Mono', 'Courier New', monospace;
  padding: 16px;
  background: rgba(0, 255, 65, 0.05);
  border: 1px solid #00ff41;
  border-radius: 4px;
}

.geek-card {
  background: rgba(17, 17, 17, 0.8) !important;
  border: 1px solid rgba(0, 255, 65, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
}

.geek-card:hover {
  border-color: #00ff41;
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
  transform: translateY(-4px);
}

:deep(.geek-tabs .v-tab) {
  font-family: 'Share Tech Mono', 'Courier New', monospace;
  letter-spacing: 1px;
}
</style>
