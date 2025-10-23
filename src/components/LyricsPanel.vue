<template>
  <v-card v-if="currentSong && showLyrics" class="lyrics-panel geek-card">
    <v-card-title class="geek-text">
      <v-icon color="primary" size="small" class="mr-2">mdi-text</v-icon>
      [ LYRICS_DATA ]
    </v-card-title>
    <v-divider style="opacity: 0.2"></v-divider>
    <v-card-text class="lyrics-content">
      <div v-if="currentSong.lyrics && currentSong.lyrics.length > 0" class="lyrics-list">
        <div
          v-for="(lyric, index) in currentSong.lyrics"
          :key="index"
          class="lyric-line"
          :class="{ active: isActiveLyric(lyric.time) }"
        >
          {{ lyric.text }}
        </div>
      </div>
      <div v-else class="text-center geek-text">
        <v-icon color="primary" size="large" class="mb-2">mdi-music-note-off</v-icon>
        <div>No lyrics available</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

const currentSong = computed(() => playerStore.currentSong)
const showLyrics = computed(() => playerStore.showLyrics)
const currentTime = computed(() => playerStore.currentTime)

function isActiveLyric(time: number): boolean {
  return currentTime.value >= time && currentTime.value < time + 3
}
</script>

<style scoped>
.lyrics-panel {
  position: fixed;
  right: 24px;
  top: 120px;
  width: 300px;
  max-height: calc(100vh - 250px);
  z-index: 100;
  background: rgba(17, 17, 17, 0.95) !important;
  border: 1px solid rgba(0, 255, 65, 0.5);
  box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
}

.lyrics-content {
  max-height: calc(100vh - 350px);
  overflow-y: auto;
}

.lyrics-list {
  font-family: 'Share Tech Mono', 'Courier New', monospace;
}

.lyric-line {
  padding: 12px 8px;
  color: #00ffff;
  opacity: 0.5;
  transition: all 0.3s ease;
  border-radius: 4px;
}

.lyric-line.active {
  color: #00ff41;
  opacity: 1;
  background: rgba(0, 255, 65, 0.1);
  font-size: 1.1em;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 65, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #00ff41;
}
</style>
