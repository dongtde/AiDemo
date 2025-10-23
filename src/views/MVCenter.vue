<template>
  <div class="mv-center pa-6">
    <div class="terminal-header mb-6">
      <div class="geek-text glow-text">&gt; VIDEO_STREAM_PORTAL</div>
      <div class="geek-text">[ HD | 4K | LIVE ]</div>
    </div>

    <v-row>
      <v-col v-for="mv in mvs" :key="mv.id" cols="12" sm="6" md="4">
        <v-card class="geek-card">
          <v-img :src="mv.coverUrl" aspect-ratio="16/9" class="geek-border">
            <v-chip size="small" color="primary" class="ma-2">{{ formatDuration(mv.duration) }}</v-chip>
            <v-overlay contained class="align-center justify-center">
              <v-btn icon color="primary" size="x-large">
                <v-icon size="x-large">mdi-play-circle</v-icon>
              </v-btn>
            </v-overlay>
          </v-img>
          <v-card-text>
            <div class="text-subtitle-1 geek-text">{{ mv.title }}</div>
            <div class="text-caption" style="color: #00ffff">{{ mv.artist }}</div>
            <div class="d-flex align-center justify-space-between mt-3">
              <div class="text-caption geek-text">
                <v-icon size="x-small" color="primary">mdi-play</v-icon>
                {{ formatPlayCount(mv.playCount) }}
              </div>
              <div class="text-caption geek-text">
                <v-icon size="x-small" color="error">mdi-heart</v-icon>
                {{ formatPlayCount(mv.likeCount) }}
              </div>
            </div>
            <div class="text-caption mt-2" style="color: #00ffff">Director: {{ mv.director }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMusicStore } from '@/stores/music'

const musicStore = useMusicStore()

const mvs = computed(() => musicStore.mvs)

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${String(secs).padStart(2, '0')}`
}

function formatPlayCount(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
}
</script>

<style scoped>
.mv-center {
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
