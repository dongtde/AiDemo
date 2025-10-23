<template>
  <v-card>
    <v-card-title>
      {{ props.title }}
    </v-card-title>
    <v-card-text>
      {{ props.message }}
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="handleClick">
        Click Me
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Props {
  title?: string
  message?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Hello World',
  message: 'This is a sample component',
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
</style>
