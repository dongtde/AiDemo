import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Album, Artist, Playlist, RankList, Song, MV } from '@/types/music'
import { mockSongs, mockAlbums, mockArtists, mockPlaylists, mockRankLists, mockMvs } from '@/mock/music'

export const useMusicStore = defineStore('music', () => {
  const songs = ref<Song[]>(mockSongs)
  const albums = ref<Album[]>(mockAlbums)
  const artists = ref<Artist[]>(mockArtists)
  const playlists = ref<Playlist[]>(mockPlaylists)
  const rankLists = ref<RankList[]>(mockRankLists)
  const mvs = ref<MV[]>(mockMvs)

  const hotSongs = computed(() => [...songs.value].sort((a, b) => b.playCount - a.playCount).slice(0, 10))
  const newSongs = computed(() => [...songs.value].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()).slice(0, 10))
  const hotPlaylists = computed(() => [...playlists.value].sort((a, b) => b.playCount - a.playCount).slice(0, 8))
  const trendingMvs = computed(() => [...mvs.value].sort((a, b) => b.playCount - a.playCount).slice(0, 8))

  function findSongById(id: string) {
    return songs.value.find(song => song.id === id)
  }

  function findAlbumById(id: string) {
    return albums.value.find(album => album.id === id)
  }

  function findArtistById(id: string) {
    return artists.value.find(artist => artist.id === id)
  }

  function findPlaylistById(id: string) {
    return playlists.value.find(playlist => playlist.id === id)
  }

  return {
    songs,
    albums,
    artists,
    playlists,
    rankLists,
    mvs,
    hotSongs,
    newSongs,
    hotPlaylists,
    trendingMvs,
    findSongById,
    findAlbumById,
    findArtistById,
    findPlaylistById,
  }
})
