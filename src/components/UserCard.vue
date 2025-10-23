<template>
  <v-card :elevation="elevation" class="user-card">
    <v-card-title class="d-flex align-center">
      <v-avatar :color="avatarColor" size="40" class="mr-3">
        <v-icon>{{ icon }}</v-icon>
      </v-avatar>
      <span>{{ user.name }}</span>
    </v-card-title>
    <v-card-text>
      <div class="mb-2">
        <v-icon size="small" class="mr-2">mdi-email</v-icon>
        {{ user.email }}
      </div>
      <div>
        <v-chip :color="roleColor" size="small">
          {{ user.role }}
        </v-chip>
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
import type { User } from '@/mock/users'

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
  return props.user.role === 'Admin' ? 'primary' : 'secondary'
})

const roleColor = computed(() => {
  return props.user.role === 'Admin' ? 'primary' : 'default'
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
