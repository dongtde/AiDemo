<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h4">
            About This Project
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-folder</v-icon>
                </template>
                <v-list-item-title>Directory Structure</v-list-item-title>
                <v-list-item-subtitle>
                  Organized with components, views, layouts, stores, services, utils, mock, and assets
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-palette</v-icon>
                </template>
                <v-list-item-title>Vuetify Theme</v-list-item-title>
                <v-list-item-subtitle>
                  Configured with custom theme colors and responsive breakpoints
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-routes</v-icon>
                </template>
                <v-list-item-title>Vue Router</v-list-item-title>
                <v-list-item-subtitle>
                  Setup with nested routes and layout components
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-database</v-icon>
                </template>
                <v-list-item-title>Pinia Store</v-list-item-title>
                <v-list-item-subtitle>
                  State management configured and ready to use
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <v-divider class="my-4"></v-divider>

            <p class="text-body-1">
              This is a fully-configured starter template with best practices for building
              modern Vue 3 applications with TypeScript, Vuetify 3 Material Design, and
              efficient state management.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
