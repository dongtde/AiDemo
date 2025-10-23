<template>
  <v-footer app height="90" class="player-footer">
    <v-container fluid class="pa-0">
      <v-row no-gutters align="center" class="px-4">
        <v-col cols="12" md="3" class="d-flex align-center">
          <div v-if="currentSong" class="d-flex align-center">
            <v-avatar size="60" rounded class="geek-border">
              <v-img :src="currentSong.coverUrl" :alt="currentSong.title" />
            </v-avatar>
            <div class="ml-4">
              <div class="text-subtitle-1 geek-text">{{ currentSong.title }}</div>
              <div class="text-caption" style="color: #00ffff">{{ currentSong.artist }}</div>
            </div>
          </div>
          <div v-else class="geek-text">No song playing</div>
        </v-col>

        <v-col cols="12" md="6">
          <div class="d-flex flex-column">
            <div class="d-flex justify-center align-center mb-2">
              <v-btn icon size="small" variant="text" @click="togglePlayMode" class="mx-1">
                <v-icon :color="'primary'">{{ playModeIcon }}</v-icon>
              </v-btn>
              <v-btn icon variant="text" @click="playPrevious" class="mx-1">
                <v-icon color="primary" size="large">mdi-skip-previous</v-icon>
              </v-btn>
              <v-btn icon variant="text" @click="togglePlay" class="mx-2" size="large">
                <v-icon color="primary" size="x-large">{{ isPlaying ? 'mdi-pause-circle' : 'mdi-play-circle' }}</v-icon>
              </v-btn>
              <v-btn icon variant="text" @click="playNext" class="mx-1">
                <v-icon color="primary" size="large">mdi-skip-next</v-icon>
              </v-btn>
              <v-btn icon size="small" variant="text" @click="toggleLyrics" class="mx-1">
                <v-icon :color="showLyrics ? 'primary' : 'grey'">mdi-text</v-icon>
              </v-btn>
            </div>
            <div class="d-flex align-center">
              <span class="text-caption geek-text mx-2">{{ formatTime(currentTime) }}</span>
              <v-slider
                v-model="currentTime"
                :max="duration"
                hide-details
                color="primary"
                track-color="surface-variant"
                class="flex-grow-1"
                @update:model-value="onSeek"
              ></v-slider>
              <span class="text-caption geek-text mx-2">{{ formatTime(duration) }}</span>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="3" class="d-flex justify-end align-center">
          <v-btn icon size="small" variant="text" @click="toggleQuality" class="mx-1">
            <v-icon color="primary" size="small">{{ qualityIcon }}</v-icon>
          </v-btn>
          <v-icon color="primary" size="small" class="mx-2">mdi-volume-high</v-icon>
          <v-slider
            v-model="volume"
            :max="1"
            :step="0.01"
            hide-details
            color="primary"
            track-color="surface-variant"
            style="max-width: 100px"
            @update:model-value="onVolumeChange"
          ></v-slider>
          <v-btn icon size="small" variant="text" @click="showPlaylistDialog" class="mx-2">
            <v-icon color="primary">mdi-playlist-music</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <audio ref="audioPlayer" @timeupdate="onTimeUpdate" @ended="onEnded" />
  </v-footer>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { usePlayerStore } from '@/stores/player'
import type { AudioQuality } from '@/types/music'

const playerStore = usePlayerStore()
const audioPlayer = ref<HTMLAudioElement | null>(null)

const currentSong = computed(() => playerStore.currentSong)
const isPlaying = computed(() => playerStore.isPlaying)
const currentTime = computed({
  get: () => playerStore.currentTime,
  set: (value) => playerStore.setCurrentTime(value)
})
const duration = computed(() => playerStore.duration)
const volume = computed({
  get: () => playerStore.volume,
  set: (value) => playerStore.setVolume(value)
})
const showLyrics = computed(() => playerStore.showLyrics)

watch(audioPlayer, (audio) => {
  if (audio) {
    audio.volume = volume.value
  }
})

const playModeIcon = computed(() => {
  const mode = playerStore.playMode
  switch (mode) {
    case 'sequence': return 'mdi-repeat'
    case 'loop': return 'mdi-repeat'
    case 'single': return 'mdi-repeat-once'
    case 'random': return 'mdi-shuffle'
    default: return 'mdi-repeat'
  }
})

const qualityIcon = computed(() => {
  const quality = playerStore.audioQuality
  switch (quality) {
    case 'standard': return 'mdi-quality-low'
    case 'high': return 'mdi-quality-high'
    case 'lossless': return 'mdi-quality-high'
    default: return 'mdi-quality-medium'
  }
})

watch(currentSong, (newSong) => {
  if (newSong && audioPlayer.value) {
    audioPlayer.value.src = newSong.audioUrl
    audioPlayer.value.currentTime = 0
    audioPlayer.value.load()
    if (playerStore.isPlaying) {
      audioPlayer.value.play()
    }
  }
})

watch(isPlaying, (playing) => {
  if (audioPlayer.value) {
    if (playing) {
      audioPlayer.value.play()
    } else {
      audioPlayer.value.pause()
    }
  }
})

watch(volume, (newVolume) => {
  if (audioPlayer.value) {
    audioPlayer.value.volume = newVolume
  }
})

function togglePlay() {
  playerStore.togglePlay()
}

function playNext() {
  playerStore.playNext()
}

function playPrevious() {
  playerStore.playPrevious()
}

function togglePlayMode() {
  const modes: ('sequence' | 'loop' | 'single' | 'random')[] = ['sequence', 'loop', 'single', 'random']
  const currentIndex = modes.indexOf(playerStore.playMode)
  const nextIndex = (currentIndex + 1) % modes.length
  playerStore.setPlayMode(modes[nextIndex])
}

function toggleQuality() {
  const qualities: AudioQuality[] = ['standard', 'high', 'lossless']
  const currentIndex = qualities.indexOf(playerStore.audioQuality)
  const nextIndex = (currentIndex + 1) % qualities.length
  playerStore.setAudioQuality(qualities[nextIndex])
}

function toggleLyrics() {
  playerStore.toggleLyrics()
}

function onSeek(value: number) {
  if (audioPlayer.value) {
    audioPlayer.value.currentTime = value
  }
}

function onVolumeChange(value: number) {
  playerStore.setVolume(value)
}

function onTimeUpdate() {
  if (audioPlayer.value) {
    playerStore.setCurrentTime(audioPlayer.value.currentTime)
  }
}

function onEnded() {
  if (playerStore.playMode === 'single' && audioPlayer.value) {
    audioPlayer.value.currentTime = 0
    audioPlayer.value.play()
    return
  }
  if (playerStore.playMode === 'loop') {
    playerStore.playNext()
    return
  }
  playerStore.playNext()
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function showPlaylistDialog() {
  console.log('Show playlist dialog')
}
</script>

<style scoped>
.player-footer {
  background: linear-gradient(to top, #0a0a0a, #111111);
  border-top: 1px solid #00ff41;
  box-shadow: 0 -2px 20px rgba(0, 255, 65, 0.2);
}
</style>
