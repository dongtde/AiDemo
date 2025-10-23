<template>
  <div class="social-hub pa-6">
    <div class="terminal-header mb-6">
      <div class="geek-text glow-text">&gt; SOCIAL_MATRIX_ONLINE</div>
      <div class="geek-text">[ FEED | COMMENTS | NOTIFICATIONS ]</div>
    </div>

    <v-row>
      <v-col cols="12" md="8">
        <v-card class="geek-card mb-6">
          <v-card-title class="geek-text">
            <v-icon color="primary" size="small" class="mr-2">mdi-rss</v-icon>
            [ FRIEND_FEED ]
          </v-card-title>
          <v-divider style="opacity: 0.2"></v-divider>
          <v-card-text>
            <v-timeline side="end" align="start" density="compact">
              <v-timeline-item
                v-for="post in feedPosts"
                :key="post.id"
                :color="post.type === 'song' ? 'primary' : 'secondary'"
              >
                <template #opposite>
                  <div class="geek-text">{{ post.time }}</div>
                </template>
                <v-card class="geek-sub-card pa-4">
                  <div class="d-flex align-center mb-3">
                    <v-avatar size="50" class="geek-border mr-3">
                      <v-img :src="post.userAvatar" />
                    </v-avatar>
                    <div>
                      <div class="geek-text">{{ post.userName }}</div>
                      <div class="text-caption" style="color: #00ffff">{{ post.action }}</div>
                    </div>
                  </div>
                  <div class="text-caption" style="color: #00ffff">{{ post.content }}</div>
                  <v-card class="geek-sub-card mt-3" v-if="post.song">
                    <v-card-text class="d-flex align-center">
                      <v-avatar size="60" rounded class="geek-border mr-4">
                        <v-img :src="post.song.coverUrl" />
                      </v-avatar>
                      <div>
                        <div class="geek-text">{{ post.song.title }}</div>
                        <div class="text-caption" style="color: #00ffff">{{ post.song.artist }}</div>
                      </div>
                      <v-spacer></v-spacer>
                      <v-btn icon variant="text" @click="playSong(post.song)">
                        <v-icon color="primary">mdi-play</v-icon>
                      </v-btn>
                    </v-card-text>
                  </v-card>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>

        <v-card class="geek-card">
          <v-card-title class="geek-text">
            <v-icon color="primary" size="small" class="mr-2">mdi-comment-plus</v-icon>
            [ POST_STATUS ]
          </v-card-title>
          <v-divider style="opacity: 0.2"></v-divider>
          <v-card-text>
            <v-textarea label="Share something with your followers" rows="4" color="primary" hide-details></v-textarea>
            <v-btn color="primary" class="mt-3">Send</v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="geek-card mb-6">
          <v-card-title class="geek-text">
            <v-icon color="primary" size="small" class="mr-2">mdi-bell</v-icon>
            [ NOTIFICATIONS ]
          </v-card-title>
          <v-divider style="opacity: 0.2"></v-divider>
          <v-list density="compact" class="geek-list">
            <v-list-item v-for="notice in notifications" :key="notice.id">
              <template #prepend>
                <v-icon :color="notice.color">{{ notice.icon }}</v-icon>
              </template>
              <v-list-item-title class="geek-text">{{ notice.title }}</v-list-item-title>
              <v-list-item-subtitle style="color: #00ffff">{{ notice.time }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>

        <v-card class="geek-card">
          <v-card-title class="geek-text">
            <v-icon color="primary" size="small" class="mr-2">mdi-account-multiple</v-icon>
            [ FOLLOW_SUGGESTIONS ]
          </v-card-title>
          <v-divider style="opacity: 0.2"></v-divider>
          <v-list density="compact" class="geek-list">
            <v-list-item v-for="user in suggestedUsers" :key="user.id">
              <template #prepend>
                <v-avatar size="40" class="geek-border mr-3">
                  <v-img :src="user.avatarUrl" />
                </v-avatar>
              </template>
              <v-list-item-title class="geek-text">{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle style="color: #00ffff">{{ user.signature }}</v-list-item-subtitle>
              <template #append>
                <v-btn size="x-small" color="primary">Follow</v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMusicStore } from '@/stores/music'
import { usePlayerStore } from '@/stores/player'
import { useUserStore } from '@/stores/user'
import type { Song } from '@/types/music'

const musicStore = useMusicStore()
const playerStore = usePlayerStore()
const userStore = useUserStore()

const feedPosts = computed(() => [
  {
    id: 'feed-1',
    userName: 'MatrixSoul',
    userAvatar: userStore.users[0].avatarUrl,
    action: 'shared a track',
    content: '这首歌太适合深夜 coding！',
    time: '2 min ago',
    type: 'song',
    song: musicStore.songs[0],
  },
  {
    id: 'feed-2',
    userName: 'CyberGuard',
    userAvatar: userStore.users[1].avatarUrl,
    action: 'posted a status',
    content: '刚刚参加了 SynthWave Live 直播，太震撼了！',
    time: '5 min ago',
    type: 'status',
  },
])

const notifications = [
  { id: 'n1', title: 'New follower: NeonHunter', time: '3 min ago', color: 'secondary', icon: 'mdi-account-plus' },
  { id: 'n2', title: 'Comment reply from SynthWave CF', time: '10 min ago', color: 'primary', icon: 'mdi-comment' },
  { id: 'n3', title: 'Your playlist reached 10k plays', time: '1 hour ago', color: 'warning', icon: 'mdi-star' },
]

const suggestedUsers = [
  { id: 's1', name: 'NeonHunter', avatarUrl: 'https://images.unsplash.com/photo-1502767089025-6572583495b0?auto=format&fit=crop&w=200&q=80', signature: 'Neon nights & synth lights.' },
  { id: 's2', name: 'WaveRider', avatarUrl: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=crop&w=200&q=80', signature: 'Ride the waves of sound.' },
]

function playSong(song: Song) {
  playerStore.playSong(song, musicStore.songs)
}
</script>

<style scoped>
.social-hub {
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
  background: rgba(17, 17, 17, 0.85) !important;
  border: 1px solid rgba(0, 255, 65, 0.3);
}

.geek-sub-card {
  background: rgba(10, 10, 10, 0.9) !important;
  border: 1px solid rgba(0, 255, 65, 0.2);
}

:deep(.v-timeline-item__circle) {
  border-color: #00ff41 !important;
}
</style>
