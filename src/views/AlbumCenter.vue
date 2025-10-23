<template>
  <div class="album-center pa-6">
    <div class="terminal-header mb-6">
      <div class="geek-text glow-text">&gt; ALBUM_VAULT_ACCESS</div>
      <div class="geek-text">[ NEW RELEASES | TOP ALBUMS | GENRES ]</div>
    </div>

    <v-row>
      <v-col v-for="album in albums" :key="album.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="geek-card">
          <v-img :src="album.coverUrl" aspect-ratio="1" class="geek-border">
            <v-overlay contained class="align-center justify-center">
              <v-btn icon color="primary" size="large" @click="playAlbum(album)">
                <v-icon size="x-large">mdi-play-circle</v-icon>
              </v-btn>
            </v-overlay>
          </v-img>
          <v-card-text>
            <div class="text-subtitle-1 geek-text text-truncate">{{ album.title }}</div>
            <div class="text-caption" style="color: #00ffff">{{ album.artist }}</div>
            <div class="d-flex align-center justify-space-between mt-3">
              <div class="text-caption geek-text">{{ album.releaseDate }}</div>
              <div class="text-caption geek-text">
                <v-icon size="x-small" color="primary">mdi-music-note</v-icon>
                {{ album.songs.length }} tracks
              </div>
            </div>
            <div class="mt-2">
              <v-chip v-for="genre in album.genre" :key="genre" size="x-small" color="secondary" class="mr-1 mb-1">
                {{ genre }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMusicStore } from '@/stores/music'
import { usePlayerStore } from '@/stores/player'
import type { Album } from '@/types/music'

const musicStore = useMusicStore()
const playerStore = usePlayerStore()

const albums = computed(() => musicStore.albums)

function playAlbum(album: Album) {
  if (album.songs.length > 0) {
    playerStore.playSong(album.songs[0], album.songs)
  }
}
</script>

<style scoped>
.album-center {
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
</style>
