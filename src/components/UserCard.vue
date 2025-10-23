<template>
  <v-card :elevation="elevation" class="user-card">
    <v-card-title class="d-flex align-center">
      <v-avatar :color="avatarColor" size="40" class="mr-3">
        <v-icon>{{ icon }}</v-icon>
      </v-avatar>
      <div>
        <div class="geek-text">{{ user.nickname }}</div>
        <div class="text-caption" style="color: #00ffff">@{{ user.username }}</div>
      </div>
    </v-card-title>
    <v-card-text>
      <div class="mb-2">
        <v-icon size="small" class="mr-2">mdi-email</v-icon>
        {{ user.email }}
      </div>
      <div class="mb-2">
        <v-icon size="small" class="mr-2">mdi-phone</v-icon>
        {{ user.phone }}
      </div>
      <div class="text-caption" style="color: #00ffff">{{ user.signature }}</div>
      <div class="mt-3">
        <v-chip :color="roleColor" size="small">VIP: {{ user.vipLevel.toUpperCase() }}</v-chip>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn variant="text" color="primary" @click="handleView">
        View
      </v-btn>
      <v-btn variant="text" color="secondary" @click="handleEdit">
        Edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { User } from '@/types/music'

interface Props {
  user: User
  elevation?: number
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  elevation: 2,
  icon: 'mdi-account',
})

const emit = defineEmits<{
  view: [user: User]
  edit: [user: User]
}>()

const avatarColor = computed(() => {
  if (!props.user.vipLevel || props.user.vipLevel === 'free') return 'secondary'
  return props.user.vipLevel === 'svip' ? 'primary' : 'secondary'
})

const roleColor = computed(() => {
  if (props.user.vipLevel === 'svip') return 'success'
  if (props.user.vipLevel === 'vip') return 'secondary'
  return 'default'
})

const handleView = () => {
  emit('view', props.user)
}

const handleEdit = () => {
  emit('edit', props.user)
}
</script>

<style scoped>
.user-card {
  max-width: 400px;
}
</style>
