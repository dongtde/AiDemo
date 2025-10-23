<template>
  <div class="playlist-detail pa-6" v-if="playlist">
    <div class="terminal-header mb-6 d-flex">
      <v-img :src="playlist.coverUrl" class="playlist-cover geek-border mr-6" aspect-ratio="1"></v-img>
      <div>
        <div class="geek-text glow-text">&gt; PLAYLIST_PROTOCOL</div>
        <h1 class="text-h4 geek-text mt-2">{{ playlist.name }}</h1>
        <div class="text-caption" style="color: #00ffff">Updated: {{ playlist.updateTime }}</div>
        <div class="text-caption" style="color: #00ffff">Creator: {{ playlist.creatorName }}</div>
        <div class="text-caption geek-text mt-2">{{ playlist.description }}</div>
        <div class="mt-4">
          <v-chip v-for="tag in playlist.tags" :key="tag" color="secondary" size="small" class="mr-2">{{ tag }}</v-chip>
        </div>
        <div class="mt-4">
          <v-btn color="primary" class="mr-2" @click="playAll">Play All</v-btn>
          <v-btn color="secondary" variant="outlined">Subscribe</v-btn>
        </div>
      </div>
    </div>

    <v-card class="geek-card">
      <v-data-table :items="playlist.songs" :headers="headers" class="geek-data-table" hide-default-footer>
        <template #item.index="{ index }">
          <span class="geek-text">{{ String(index + 1).padStart(2, '0') }}</span>
        </template>
        <template #item.coverUrl="{ item }">
          <v-avatar size="50" rounded class="geek-border">
            <v-img :src="item.coverUrl" />
          </v-avatar>
        </template>
        <template #item.duration="{ item }">
          <span class="geek-text">{{ formatDuration(item.duration) }}</span>
        </template>
        <template #item.actions="{ item }">
          <v-btn icon variant="text" size="small" @click="playSong(item)">
            <v-icon color="primary">mdi-play</v-icon>
          </v-btn>
          <v-btn icon variant="text" size="small">
            <v-icon color="secondary">mdi-heart-outline</v-icon>
          </v-btn>
          <v-btn icon variant="text" size="small">
            <v-icon color="info">mdi-share-variant</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMusicStore } from '@/stores/music'
import { usePlayerStore } from '@/stores/player'
import type { Song } from '@/types/music'

const route = useRoute()
const musicStore = useMusicStore()
const playerStore = usePlayerStore()

const headers = [
  { title: '#', value: 'index', sortable: false },
  { title: 'Cover', value: 'coverUrl', sortable: false },
  { title: 'Title', value: 'title' },
  { title: 'Artist', value: 'artist' },
  { title: 'Album', value: 'album' },
  { title: 'Duration', value: 'duration' },
  { title: 'Actions', value: 'actions', sortable: false },
]

const playlist = computed(() => {
  const id = route.params.id as string
  return musicStore.findPlaylistById(id)
})

function playSong(song: Song) {
  if (!playlist.value) return
  playerStore.playSong(song, playlist.value.songs)
}

function playAll() {
  if (!playlist.value) return
  const [first] = playlist.value.songs
  if (first) {
    playerStore.playSong(first, playlist.value.songs)
  }
}

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${String(secs).padStart(2, '0')}`
}
</script>

<style scoped>
.playlist-detail {
  min-height: calc(100vh - 160px);
}

.terminal-header {
  font-family: 'Share Tech Mono', 'Courier New', monospace;
  padding: 16px;
  background: rgba(0, 255, 65, 0.05);
  border: 1px solid #00ff41;
  border-radius: 4px;
}

.playlist-cover {
  max-width: 220px;
  border-radius: 4px;
}

.geek-card {
  background: rgba(17, 17, 17, 0.8) !important;
  border: 1px solid rgba(0, 255, 65, 0.3);
}

:deep(.geek-data-table .v-data-table-header th) {
  color: #00ff41;
  font-family: 'Share Tech Mono', 'Courier New', monospace;
}

:deep(.geek-data-table .v-data-table__td) {
  color: #00ffff;
}
</style>
