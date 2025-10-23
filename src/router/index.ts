import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MusicLayout from '@/layouts/MusicLayout.vue'
import MusicHome from '@/views/MusicHome.vue'
import Discover from '@/views/Discover.vue'
import Library from '@/views/Library.vue'
import PlaylistHub from '@/views/PlaylistHub.vue'
import ArtistCenter from '@/views/ArtistCenter.vue'
import AlbumCenter from '@/views/AlbumCenter.vue'
import RankHub from '@/views/RankHub.vue'
import MVCenter from '@/views/MVCenter.vue'
import PlaylistDetail from '@/views/PlaylistDetail.vue'
import UserCenter from '@/views/UserCenter.vue'
import SocialHub from '@/views/SocialHub.vue'
import SettingsCenter from '@/views/SettingsCenter.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MusicLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: MusicHome,
      },
      {
        path: 'discover',
        name: 'Discover',
        component: Discover,
      },
      {
        path: 'library',
        name: 'Library',
        component: Library,
      },
      {
        path: 'playlists',
        name: 'Playlists',
        component: PlaylistHub,
      },
      {
        path: 'artists',
        name: 'Artists',
        component: ArtistCenter,
      },
      {
        path: 'albums',
        name: 'Albums',
        component: AlbumCenter,
      },
      {
        path: 'ranks',
        name: 'Ranks',
        component: RankHub,
      },
      {
        path: 'mvs',
        name: 'MVs',
        component: MVCenter,
      },
      {
        path: 'playlist/:id',
        name: 'PlaylistDetail',
        component: PlaylistDetail,
      },
      {
        path: 'profile',
        name: 'Profile',
        component: UserCenter,
      },
      {
        path: 'social',
        name: 'Social',
        component: SocialHub,
      },
      {
        path: 'settings',
        name: 'Settings',
        component: SettingsCenter,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
