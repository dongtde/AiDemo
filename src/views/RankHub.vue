<template>
  <div class="rank-hub pa-6">
    <div class="terminal-header mb-6">
      <div class="geek-text glow-text">&gt; RANKING_ANALYZER_ACTIVE</div>
      <div class="geek-text">[ HOT | NEW | USER ]</div>
    </div>

    <v-row>
      <v-col v-for="rank in rankLists" :key="rank.id" cols="12" md="6">
        <v-card class="geek-card mb-6">
          <v-card-title class="geek-text">
            <v-icon color="primary" size="small" class="mr-2">mdi-trophy</v-icon>
            {{ rank.name }}
            <v-chip size="x-small" color="secondary" class="ml-3">{{ rank.updateFrequency }}</v-chip>
          </v-card-title>
          <v-divider style="opacity: 0.2"></v-divider>
          <v-card-text>
            <v-list class="geek-list">
              <v-list-item v-for="(song, index) in rank.songs.slice(0, 10)" :key="song.id">
                <template #prepend>
                  <div class="rank-number">{{ String(index + 1).padStart(2, '0') }}</div>
                </template>
                <v-list-item-title class="geek-text">{{ song.title }}</v-list-item-title>
                <v-list-item-subtitle style="color: #00ffff">{{ song.artist }}</v-list-item-subtitle>
                <template #append>
                  <v-btn icon variant="text" size="small" @click="playSong(song, rank.songs)">
                    <v-icon color="primary">mdi-play</v-icon>
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
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

const rankLists = computed(() => musicStore.rankLists)

function playSong(song: Song, list: Song[]) {
  playerStore.playSong(song, list)
}
</script>

<style scoped>
.rank-hub {
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

.rank-number {
  width: 40px;
  text-align: center;
  font-family: 'Share Tech Mono', 'Courier New', monospace;
  color: #00ff41;
}
</style>
