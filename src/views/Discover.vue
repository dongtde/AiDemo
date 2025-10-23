<template>
  <div class="discover-page pa-6">
    <div class="terminal-header mb-6">
      <div class="geek-text glow-text">&gt; DISCOVER_MODE_ACTIVATED</div>
    </div>

    <v-row>
      <v-col cols="12" md="8">
        <div class="section-header geek-text mb-4">
          <v-icon color="primary" size="small" class="mr-2">mdi-chart-line</v-icon>
          [ TRENDING_NOW ]
        </div>
        <v-card class="geek-card mb-6">
          <v-card-text>
            <v-row>
              <v-col v-for="(song, index) in hotSongs.slice(0, 10)" :key="song.id" cols="12" class="py-2">
                <div class="d-flex align-center song-row" @click="playSong(song, hotSongs)">
                  <div class="rank-number geek-text mr-4">{{ String(index + 1).padStart(2, '0') }}</div>
                  <v-avatar size="50" rounded class="geek-border mr-4">
                    <v-img :src="song.coverUrl" />
                  </v-avatar>
                  <div class="flex-grow-1">
                    <div class="text-subtitle-2 geek-text">{{ song.title }}</div>
                    <div class="text-caption" style="color: #00ffff">{{ song.artist }}</div>
                  </div>
                  <div class="text-caption geek-text mr-4">{{ formatDuration(song.duration) }}</div>
                  <v-btn icon size="small" variant="text">
                    <v-icon color="primary">mdi-play</v-icon>
                  </v-btn>
                  <v-btn icon size="small" variant="text">
                    <v-icon color="error">{{ song.isLiked ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                  </v-btn>
                </div>
                <v-divider v-if="index < 9" class="mt-2" style="opacity: 0.1"></v-divider>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <div class="section-header geek-text mb-4">
          <v-icon color="warning" size="small" class="mr-2">mdi-playlist-star</v-icon>
          [ FEATURED ]
        </div>
        <v-card v-for="playlist in hotPlaylists.slice(0, 3)" :key="playlist.id" class="geek-card mb-4">
          <v-img :src="playlist.coverUrl" height="150" class="geek-border">
            <v-overlay contained class="align-center justify-center">
              <v-btn icon color="primary" size="large" @click="goToPlaylist(playlist.id)">
                <v-icon size="x-large">mdi-playlist-play</v-icon>
              </v-btn>
            </v-overlay>
          </v-img>
          <v-card-text>
            <div class="text-subtitle-2 geek-text">{{ playlist.name }}</div>
            <div class="text-caption" style="color: #00ffff">{{ playlist.creatorName }}</div>
            <div class="text-caption geek-text mt-2">{{ playlist.songs.length }} tracks</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMusicStore } from '@/stores/music'
import { usePlayerStore } from '@/stores/player'
import type { Song } from '@/types/music'

const router = useRouter()
const musicStore = useMusicStore()
const playerStore = usePlayerStore()

const hotSongs = computed(() => musicStore.hotSongs)
const hotPlaylists = computed(() => musicStore.hotPlaylists)

function playSong(song: Song, playlist: Song[]) {
  playerStore.playSong(song, playlist)
}

function goToPlaylist(id: string) {
  router.push(`/playlist/${id}`)
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${String(secs).padStart(2, '0')}`
}
</script>

<style scoped>
.discover-page {
  min-height: calc(100vh - 160px);
}

.terminal-header {
  font-family: 'Share Tech Mono', 'Courier New', monospace;
  padding: 16px;
  background: rgba(0, 255, 65, 0.05);
  border: 1px solid #00ff41;
  border-radius: 4px;
}

.section-header {
  font-family: 'Share Tech Mono', 'Courier New', monospace;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
}

.geek-card {
  background: rgba(17, 17, 17, 0.8) !important;
  border: 1px solid rgba(0, 255, 65, 0.3);
  transition: all 0.3s ease;
}

.geek-card:hover {
  border-color: #00ff41;
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
}

.song-row {
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.song-row:hover {
  background: rgba(0, 255, 65, 0.05);
}

.rank-number {
  font-family: 'Share Tech Mono', 'Courier New', monospace;
  font-size: 20px;
  font-weight: bold;
  min-width: 40px;
  text-align: center;
}
</style>
