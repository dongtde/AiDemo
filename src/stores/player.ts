import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Song, PlayMode, AudioQuality } from '@/types/music'

export const usePlayerStore = defineStore('player', () => {
  const currentSong = ref<Song | null>(null)
  const playlist = ref<Song[]>([])
  const currentIndex = ref(0)
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const volume = ref(0.8)
  const playMode = ref<PlayMode>('sequence')
  const audioQuality = ref<AudioQuality>('high')
  const showLyrics = ref(true)
  const showMiniPlayer = ref(false)

  const duration = computed(() => currentSong.value?.duration || 0)
  const progress = computed(() => (duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0))

  function playSong(song: Song, list?: Song[]) {
    currentSong.value = song
    if (list && list.length > 0) {
      playlist.value = list
      currentIndex.value = list.findIndex(s => s.id === song.id)
    }
    isPlaying.value = true
    currentTime.value = 0
  }

  function togglePlay() {
    isPlaying.value = !isPlaying.value
  }

  function pause() {
    isPlaying.value = false
  }

  function play() {
    isPlaying.value = true
  }

  function playNext() {
    if (playlist.value.length === 0) return

    let nextIndex = currentIndex.value
    
    if (playMode.value === 'random') {
      nextIndex = Math.floor(Math.random() * playlist.value.length)
    } else if (playMode.value === 'single') {
      currentTime.value = 0
      return
    } else {
      nextIndex = (currentIndex.value + 1) % playlist.value.length
    }

    currentIndex.value = nextIndex
    currentSong.value = playlist.value[nextIndex]
    currentTime.value = 0
    isPlaying.value = true
  }

  function playPrevious() {
    if (playlist.value.length === 0) return

    let prevIndex = currentIndex.value
    
    if (playMode.value === 'random') {
      prevIndex = Math.floor(Math.random() * playlist.value.length)
    } else {
      prevIndex = (currentIndex.value - 1 + playlist.value.length) % playlist.value.length
    }

    currentIndex.value = prevIndex
    currentSong.value = playlist.value[prevIndex]
    currentTime.value = 0
    isPlaying.value = true
  }

  function setCurrentTime(time: number) {
    currentTime.value = time
  }

  function setVolume(vol: number) {
    volume.value = Math.max(0, Math.min(1, vol))
  }

  function setPlayMode(mode: PlayMode) {
    playMode.value = mode
  }

  function setAudioQuality(quality: AudioQuality) {
    audioQuality.value = quality
  }

  function addToPlaylist(song: Song) {
    const exists = playlist.value.find(s => s.id === song.id)
    if (!exists) {
      playlist.value.push(song)
    }
  }

  function removeFromPlaylist(songId: string) {
    const index = playlist.value.findIndex(s => s.id === songId)
    if (index > -1) {
      playlist.value.splice(index, 1)
      if (index < currentIndex.value) {
        currentIndex.value--
      } else if (index === currentIndex.value) {
        if (playlist.value.length > 0) {
          currentSong.value = playlist.value[Math.min(currentIndex.value, playlist.value.length - 1)]
        } else {
          currentSong.value = null
          isPlaying.value = false
        }
      }
    }
  }

  function clearPlaylist() {
    playlist.value = []
    currentSong.value = null
    currentIndex.value = 0
    isPlaying.value = false
    currentTime.value = 0
  }

  function toggleLyrics() {
    showLyrics.value = !showLyrics.value
  }

  function toggleMiniPlayer() {
    showMiniPlayer.value = !showMiniPlayer.value
  }

  return {
    currentSong,
    playlist,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    progress,
    volume,
    playMode,
    audioQuality,
    showLyrics,
    showMiniPlayer,
    playSong,
    togglePlay,
    pause,
    play,
    playNext,
    playPrevious,
    setCurrentTime,
    setVolume,
    setPlayMode,
    setAudioQuality,
    addToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
    toggleLyrics,
    toggleMiniPlayer,
  }
})
