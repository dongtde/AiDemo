<template>
  <div class="library-page pa-6">
    <div class="terminal-header mb-6">
      <div class="geek-text glow-text">&gt; PERSONAL_LIBRARY_ACCESS</div>
      <div class="geek-text">[ RECENT_ACTIVITY | FAVORITES | DOWNLOADS ]</div>
    </div>

    <v-row>
      <v-col cols="12" md="8">
        <div class="section-header geek-text mb-4">
          <v-icon color="primary" size="small" class="mr-2">mdi-heart</v-icon>
          [ FAVORITE_TRACKS ]
        </div>
        <v-card class="geek-card mb-6">
          <v-data-table
            :items="favoriteSongs"
            :headers="songHeaders"
            class="geek-data-table"
            hide-default-footer
          >
            <template #item.actions="{ item }">
              <v-btn icon variant="text" size="small" @click="playSong(item)">
                <v-icon color="primary">mdi-play</v-icon>
              </v-btn>
              <v-btn icon variant="text" size="small">
                <v-icon color="secondary">mdi-heart</v-icon>
              </v-btn>
              <v-btn icon variant="text" size="small">
                <v-icon color="info">mdi-share-variant</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <div class="section-header geek-text mb-4">
          <v-icon color="warning" size="small" class="mr-2">mdi-music-box-multiple</v-icon>
          [ RECENT_PLAYS ]
        </div>
        <v-card class="geek-card mb-6">
          <v-list lines="two">
            <v-list-item v-for="history in recentPlays" :key="history.song.id" @click="playSongFromHistory(history.song)">
              <template #prepend>
                <v-avatar size="50" rounded class="geek-border mr-3">
                  <v-img :src="history.song.coverUrl" />
                </v-avatar>
              </template>
              <v-list-item-title class="geek-text">{{ history.song.title }}</v-list-item-title>
              <v-list-item-subtitle style="color: #00ffff">{{ history.song.artist }}</v-list-item-subtitle>
              <template #append>
                <div class="text-caption geek-text">{{ formatDate(history.playTime) }}</div>
              </template>
            </v-list-item>
          </v-list>
        </v-card>

        <div class="section-header geek-text mb-4">
          <v-icon color="secondary" size="small" class="mr-2">mdi-download</v-icon>
          [ DOWNLOAD_MANAGEMENT ]
        </div>
        <v-card class="geek-card">
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <div class="d-flex justify-space-between align-center" v-for="option in downloadOptions" :key="option.label">
                  <div>
                    <div class="geek-text">{{ option.label }}</div>
                    <div class="text-caption" style="color: #00ffff">{{ option.description }}</div>
                  </div>
                  <v-switch color="primary" :model-value="option.enabled"></v-switch>
                </div>
              </v-col>
            </v-row>
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
import type { Song } from '@/types/music'

const musicStore = useMusicStore()
const playerStore = usePlayerStore()

const songHeaders = [
  { title: '#', value: 'index', sortable: false },
  { title: 'Title', value: 'title' },
  { title: 'Artist', value: 'artist' },
  { title: 'Album', value: 'album' },
  { title: 'Duration', value: 'formattedDuration' },
  { title: 'Actions', value: 'actions', sortable: false },
]

const favoriteSongs = computed(() =>
  musicStore.songs
    .filter(song => song.isLiked)
    .map((song, index) => ({
      ...song,
      index: index + 1,
      formattedDuration: formatDuration(song.duration),
    }))
)

const recentPlays = computed(() =>
  musicStore.songs.slice(0, 5).map(song => ({
    song,
    playTime: new Date().toISOString(),
    playCount: song.playCount,
  }))
)

const downloadOptions = [
  { label: 'Auto Cache Playback', description: 'Automatically cache songs you listen to', enabled: true },
  { label: 'Wi-Fi Only Downloads', description: 'Restrict downloads to Wi-Fi connections', enabled: true },
  { label: 'High Quality Download', description: 'Always download in high quality', enabled: false },
]

function playSong(item: typeof favoriteSongs.value[0]) {
  if (!item) return
  const song = extractSong(item)
  if (song) {
    playerStore.playSong(song, musicStore.songs)
  }
}

function playSongFromHistory(song: Song) {
  playerStore.playSong(song, musicStore.songs)
}

function extractSong(input: typeof favoriteSongs.value[0] | Song): Song | undefined {
  if (!input) return undefined
  if ('formattedDuration' in input) {
    return musicStore.songs.find(s => s.id === input.id)
  }
  return input
}

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${String(secs).padStart(2, '0')}`
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}
</script>

<style scoped>
.library-page {
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
}

:deep(.geek-data-table .v-data-table__wrapper) {
  background-color: transparent;
}

:deep(.geek-data-table .v-data-table-header th) {
  color: #00ff41;
  font-family: 'Share Tech Mono', 'Courier New', monospace;
  letter-spacing: 1px;
}

:deep(.geek-data-table .v-data-table__td) {
  color: #00ffff;
}
</style>
