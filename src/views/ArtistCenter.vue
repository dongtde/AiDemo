<template>
  <div class="artist-center pa-6">
    <div class="terminal-header mb-6">
      <div class="geek-text glow-text">&gt; ARTIST_INTEL_HUB</div>
      <div class="geek-text">[ FOLLOW | TOP TRACKS | BIOGRAPHY ]</div>
    </div>

    <v-row>
      <v-col v-for="artist in artists" :key="artist.id" cols="12" md="6" lg="4">
        <v-card class="geek-card pa-4">
          <div class="d-flex align-center">
            <v-avatar size="70" class="geek-border mr-4">
              <v-img :src="artist.avatarUrl" />
            </v-avatar>
            <div class="flex-grow-1">
              <div class="text-h6 geek-text">{{ artist.name }}</div>
              <div class="text-caption" style="color: #00ffff">{{ formatFollowers(artist.followerCount) }} followers</div>
              <v-chip size="small" color="secondary" class="mt-2">Top Artist</v-chip>
            </div>
            <v-btn color="primary" variant="outlined">{{ artist.isFollowed ? 'FOLLOWING' : 'FOLLOW' }}</v-btn>
          </div>

          <v-divider class="my-4" style="opacity: 0.2"></v-divider>

          <div class="geek-text mb-2">[ BIO ]</div>
          <div class="text-caption" style="color: #00ffff">{{ artist.bio }}</div>

          <div class="geek-text mt-4 mb-2">[ TOP TRACKS ]</div>
          <v-list density="compact" class="geek-list">
            <v-list-item v-for="song in artist.topSongs.slice(0, 3)" :key="song.id" @click="playSong(song, artist.topSongs)">
              <template #prepend>
                <v-avatar size="40" rounded class="geek-border mr-3">
                  <v-img :src="song.coverUrl" />
                </v-avatar>
              </template>
              <v-list-item-title class="geek-text">{{ song.title }}</v-list-item-title>
              <v-list-item-subtitle style="color: #00ffff">{{ song.album }}</v-list-item-subtitle>
              <template #append>
                <v-btn icon size="small" variant="text">
                  <v-icon color="primary">mdi-play</v-icon>
                </v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMusicStore } from '@/stores/music'
import { usePlayerStore } from '@/stores/player'
import type { Song } from '@/types/music'

const musicStore = useMusicStore()
const playerStore = usePlayerStore()

const artists = computed(() => musicStore.artists)

function playSong(song: Song, list: Song[]) {
  playerStore.playSong(song, list)
}

function formatFollowers(count: number) {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
}
</script>

<style scoped>
.artist-center {
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
}

.geek-card:hover {
  border-color: #00ff41;
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
  transform: translateY(-4px);
}

:deep(.geek-list .v-list-item-title) {
  color: #00ff41;
}

:deep(.geek-list .v-list-item:hover) {
  background: rgba(0, 255, 65, 0.05);
}
</style>
