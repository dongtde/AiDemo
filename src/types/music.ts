export interface Song {
  id: string
  title: string
  artist: string
  artistId: string
  album: string
  albumId: string
  duration: number
  coverUrl: string
  audioUrl: string
  lyrics?: Lyric[]
  genre: string[]
  releaseDate: string
  playCount: number
  likeCount: number
  isLiked?: boolean
  quality: AudioQuality
}

export interface Album {
  id: string
  title: string
  artist: string
  artistId: string
  coverUrl: string
  releaseDate: string
  genre: string[]
  description: string
  songs: Song[]
  playCount: number
  company: string
}

export interface Artist {
  id: string
  name: string
  avatarUrl: string
  bio: string
  albums: Album[]
  followerCount: number
  isFollowed?: boolean
  topSongs: Song[]
}

export interface Lyric {
  time: number
  text: string
  translation?: string
}

export interface Playlist {
  id: string
  name: string
  description: string
  coverUrl: string
  creatorId: string
  creatorName: string
  songs: Song[]
  playCount: number
  subscriberCount: number
  isPublic: boolean
  tags: string[]
  createTime: string
  updateTime: string
}

export interface User {
  id: string
  username: string
  nickname: string
  email: string
  phone: string
  avatarUrl: string
  gender: 'male' | 'female' | 'other'
  birthday: string
  region: string
  signature: string
  vipLevel: VipLevel
  vipExpireDate?: string
  isVerified: boolean
  followers: number
  following: number
  playlists: Playlist[]
  likedSongs: Song[]
  recentPlays: PlayHistory[]
}

export interface PlayHistory {
  song: Song
  playTime: string
  playCount: number
}

export interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createTime: string
  likeCount: number
  isLiked: boolean
  replies: Comment[]
  targetId: string
  targetType: 'song' | 'album' | 'playlist' | 'mv' | 'comment'
}

export interface MV {
  id: string
  title: string
  artist: string
  artistId: string
  coverUrl: string
  videoUrl: string
  duration: number
  playCount: number
  likeCount: number
  description: string
  publishTime: string
  director: string
}

export type AudioQuality = 'standard' | 'high' | 'lossless'
export type VipLevel = 'free' | 'vip' | 'svip'
export type PlayMode = 'sequence' | 'loop' | 'single' | 'random'

export interface RankList {
  id: string
  name: string
  description: string
  coverUrl: string
  updateFrequency: string
  songs: Song[]
}

export interface Theme {
  name: string
  primary: string
  secondary: string
  background: string
  surface: string
  text: string
  accent: string
}
