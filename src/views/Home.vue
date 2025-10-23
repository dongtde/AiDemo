<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h4">
            Welcome to Vite + Vue 3 + TypeScript + Vuetify
          </v-card-title>
          <v-card-text>
            <p class="text-h6 mb-4">
              This project includes the following technologies:
            </p>
            <v-row>
              <v-col cols="12" sm="6" md="3" v-for="tech in technologies" :key="tech.name">
                <v-card variant="tonal" class="pa-4 text-center">
                  <v-icon size="48" :color="tech.color" class="mb-2">{{ tech.icon }}</v-icon>
                  <div class="text-h6">{{ tech.name }}</div>
                  <div class="text-caption">{{ tech.version }}</div>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="incrementCounter">
              Clicks: {{ counter }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const counter = ref(0)

const technologies = [
  { name: 'Vite', version: 'v5', icon: 'mdi-lightning-bolt', color: 'purple' },
  { name: 'Vue 3', version: 'v3', icon: 'mdi-vuejs', color: 'green' },
  { name: 'TypeScript', version: 'v5', icon: 'mdi-language-typescript', color: 'blue' },
  { name: 'Vuetify', version: 'v3', icon: 'mdi-vuetify', color: 'primary' },
  { name: 'Pinia', version: 'Latest', icon: 'mdi-database', color: 'orange' },
  { name: 'Vue Router', version: 'v4', icon: 'mdi-routes', color: 'teal' },
]

const incrementCounter = () => {
  counter.value++
}
</script>

<style scoped>
</style>
