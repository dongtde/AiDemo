<template>
  <div class="music-home">
    <div class="terminal-header mb-6">
      <div class="terminal-line geek-text">
        <span class="glow-text">&gt; SYSTEM_ONLINE</span>
        <span class="ml-2">| WELCOME TO GEEK MUSIC PLAYER v1.0</span>
      </div>
      <div class="terminal-line geek-text mt-1">
        <span>&gt; DATE: {{ currentDate }}</span>
        <span class="ml-4">| TIME: {{ currentTime }}</span>
      </div>
    </div>

    <v-row>
      <v-col cols="12">
        <div class="section-header geek-text mb-4">
          <v-icon color="primary" size="small" class="mr-2">mdi-fire</v-icon>
          [ HOT_TRACKS ]
        </div>
        <v-row>
          <v-col v-for="song in hotSongs" :key="song.id" cols="12" sm="6" md="4" lg="3">
            <v-card class="geek-card" @click="playSong(song)">
              <v-img :src="song.coverUrl" aspect-ratio="1" class="geek-border">
                <v-overlay contained class="align-center justify-center">
                  <v-btn icon color="primary" size="large">
                    <v-icon size="x-large">mdi-play-circle</v-icon>
                  </v-btn>
                </v-overlay>
              </v-img>
              <v-card-text>
                <div class="text-subtitle-2 geek-text text-truncate">{{ song.title }}</div>
                <div class="text-caption" style="color: #00ffff">{{ song.artist }}</div>
                <div class="text-caption geek-text mt-1">
                  <v-icon size="x-small" color="primary">mdi-play</v-icon>
                  {{ formatPlayCount(song.playCount) }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-divider class="my-6" color="primary" style="opacity: 0.3"></v-divider>

    <v-row>
      <v-col cols="12">
        <div class="section-header geek-text mb-4">
          <v-icon color="secondary" size="small" class="mr-2">mdi-new-box</v-icon>
          [ NEW_RELEASES ]
        </div>
        <v-row>
          <v-col v-for="song in newSongs" :key="song.id" cols="12" sm="6" md="4" lg="3">
            <v-card class="geek-card" @click="playSong(song)">
              <v-img :src="song.coverUrl" aspect-ratio="1" class="geek-border">
                <v-chip color="secondary" size="small" class="ma-2">NEW</v-chip>
                <v-overlay contained class="align-center justify-center">
                  <v-btn icon color="primary" size="large">
                    <v-icon size="x-large">mdi-play-circle</v-icon>
                  </v-btn>
                </v-overlay>
              </v-img>
              <v-card-text>
                <div class="text-subtitle-2 geek-text text-truncate">{{ song.title }}</div>
                <div class="text-caption" style="color: #00ffff">{{ song.artist }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-divider class="my-6" color="primary" style="opacity: 0.3"></v-divider>

    <v-row>
      <v-col cols="12">
        <div class="section-header geek-text mb-4">
          <v-icon color="warning" size="small" class="mr-2">mdi-playlist-star</v-icon>
          [ FEATURED_PLAYLISTS ]
        </div>
        <v-row>
          <v-col v-for="playlist in hotPlaylists" :key="playlist.id" cols="12" sm="6" md="4" lg="3">
            <v-card class="geek-card" @click="goToPlaylist(playlist.id)">
              <v-img :src="playlist.coverUrl" aspect-ratio="1" class="geek-border">
                <v-overlay contained class="align-center justify-center">
                  <v-btn icon color="primary" size="large">
                    <v-icon size="x-large">mdi-playlist-play</v-icon>
                  </v-btn>
                </v-overlay>
              </v-img>
              <v-card-text>
                <div class="text-subtitle-2 geek-text text-truncate">{{ playlist.name }}</div>
                <div class="text-caption" style="color: #00ffff">{{ playlist.creatorName }}</div>
                <div class="text-caption geek-text mt-1">
                  <v-icon size="x-small" color="primary">mdi-music-note</v-icon>
                  {{ playlist.songs.length }} tracks
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMusicStore } from '@/stores/music'
import { usePlayerStore } from '@/stores/player'
import type { Song } from '@/types/music'

const router = useRouter()
const musicStore = useMusicStore()
const playerStore = usePlayerStore()

const currentDate = ref('')
const currentTime = ref('')
let timeInterval: number

const hotSongs = computed(() => musicStore.hotSongs.slice(0, 8))
const newSongs = computed(() => musicStore.newSongs.slice(0, 8))
const hotPlaylists = computed(() => musicStore.hotPlaylists)

onMounted(() => {
  updateDateTime()
  timeInterval = window.setInterval(updateDateTime, 1000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})

function updateDateTime() {
  const now = new Date()
  currentDate.value = now.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  }).replace(/\//g, '-')
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

function playSong(song: Song) {
  const allSongs = [...musicStore.hotSongs, ...musicStore.newSongs]
  playerStore.playSong(song, allSongs)
}

function goToPlaylist(id: string) {
  router.push(`/playlist/${id}`)
}

function formatPlayCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}
</script>

<style scoped>
.music-home {
  padding: 24px;
}

.terminal-header {
  font-family: 'Share Tech Mono', 'Courier New', monospace;
  padding: 16px;
  background: rgba(0, 255, 65, 0.05);
  border: 1px solid #00ff41;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.2);
}

.terminal-line {
  font-size: 14px;
  letter-spacing: 1px;
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
  cursor: pointer;
}

.geek-card:hover {
  border-color: #00ff41;
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.4);
  transform: translateY(-4px);
}

.geek-card .v-img {
  border-bottom: 1px solid rgba(0, 255, 65, 0.3);
}
</style>
