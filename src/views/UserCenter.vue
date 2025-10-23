<template>
  <div class="user-center pa-6">
    <div class="terminal-header mb-6">
      <div class="geek-text glow-text">&gt; USER_CONTROL_CENTER</div>
      <div class="geek-text">[ PROFILE | SECURITY | MEMBERSHIP ]</div>
    </div>

    <v-row>
      <v-col cols="12" md="4">
        <v-card class="geek-card mb-6">
          <v-card-text class="text-center">
            <v-avatar size="120" class="geek-border mb-4">
              <v-img :src="currentUser?.avatarUrl" />
            </v-avatar>
            <div class="text-h6 geek-text">{{ currentUser?.nickname }}</div>
            <div class="text-caption" style="color: #00ffff">@{{ currentUser?.username }}</div>
            <v-chip color="secondary" size="small" class="mt-3">VIP LEVEL: {{ currentUser?.vipLevel.toUpperCase() }}</v-chip>
            <div class="text-caption mt-2" style="color: #00ffff">Expires: {{ currentUser?.vipExpireDate }}</div>
            <div class="text-caption mt-2" style="color: #00ffff">{{ currentUser?.signature }}</div>
          </v-card-text>
        </v-card>

        <v-card class="geek-card">
          <v-card-title class="geek-text">
            <v-icon color="primary" size="small" class="mr-2">mdi-account-details</v-icon>
            [ BASIC_INFORMATION ]
          </v-card-title>
          <v-divider style="opacity: 0.2"></v-divider>
          <v-card-text>
            <v-list density="compact" class="geek-list">
              <v-list-item><v-list-item-title class="geek-text">Email: {{ currentUser?.email }}</v-list-item-title></v-list-item>
              <v-list-item><v-list-item-title class="geek-text">Phone: {{ currentUser?.phone }}</v-list-item-title></v-list-item>
              <v-list-item><v-list-item-title class="geek-text">Birthday: {{ currentUser?.birthday }}</v-list-item-title></v-list-item>
              <v-list-item><v-list-item-title class="geek-text">Region: {{ currentUser?.region }}</v-list-item-title></v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card class="geek-card mb-6">
          <v-card-title class="geek-text">
            <v-icon color="primary" size="small" class="mr-2">mdi-security</v-icon>
            [ ACCOUNT_SECURITY ]
          </v-card-title>
          <v-divider style="opacity: 0.2"></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" v-for="security in securityOptions" :key="security.title">
                <v-card class="geek-sub-card mb-4">
                  <v-card-title class="geek-text">{{ security.title }}</v-card-title>
                  <v-card-text>
                    <div class="text-caption" style="color: #00ffff">{{ security.description }}</div>
                    <v-btn size="small" color="primary" class="mt-3">{{ security.action }}</v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="geek-card">
          <v-card-title class="geek-text">
            <v-icon color="primary" size="small" class="mr-2">mdi-database</v-icon>
            [ ACTIVITY_SUMMARY ]
          </v-card-title>
          <v-divider style="opacity: 0.2"></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="4" v-for="stat in activityStats" :key="stat.label">
                <div class="stat-block">
                  <div class="stat-value geek-text">{{ stat.value }}</div>
                  <div class="stat-label" style="color: #00ffff">{{ stat.label }}</div>
                </div>
              </v-col>
            </v-row>
            <v-divider class="my-4" style="opacity: 0.2"></v-divider>
            <div class="geek-text mb-2">[ RECENT LISTENING ]</div>
            <v-chip-group column>
              <v-chip v-for="play in currentUser?.recentPlays" :key="play.song.id" color="secondary" class="ma-1">
                {{ play.song.title }}
              </v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const currentUser = computed(() => userStore.currentUser)

const securityOptions = [
  { title: 'Login Devices', description: 'View and manage devices with active sessions', action: 'Manage' },
  { title: 'Password Protection', description: 'Update your login password for enhanced security', action: 'Change Password' },
  { title: 'Two-factor Authentication', description: 'Enable OTP verification for sensitive operations', action: 'Enable 2FA' },
  { title: 'Account Risk Scan', description: 'Detect abnormal login activities and unusual IPs', action: 'Scan Now' },
]

const activityStats = [
  { label: 'Total Play Count', value: '12,543' },
  { label: 'Playlists Created', value: '15' },
  { label: 'Followers', value: '15.2K' },
]
</script>

<style scoped>
.user-center {
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
  background: rgba(12, 12, 12, 0.9) !important;
  border: 1px solid rgba(0, 255, 65, 0.2);
}

.stat-block {
  padding: 16px;
  background: rgba(0, 255, 65, 0.05);
  border-radius: 6px;
  border: 1px solid rgba(0, 255, 65, 0.2);
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
}
</style>
