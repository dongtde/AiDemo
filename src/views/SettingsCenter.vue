<template>
  <div class="settings-center pa-6">
    <div class="terminal-header mb-6">
      <div class="geek-text glow-text">&gt; SYSTEM_SETTINGS_HUB</div>
      <div class="geek-text">[ PLAYBACK | PRIVACY | ACCESSIBILITY ]</div>
    </div>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="geek-card mb-6">
          <v-card-title class="geek-text">
            <v-icon color="primary" size="small" class="mr-2">mdi-music-box</v-icon>
            [ PLAYBACK_SETTINGS ]
          </v-card-title>
          <v-divider style="opacity: 0.2"></v-divider>
          <v-card-text>
            <v-switch v-for="setting in playbackSettings" :key="setting.label" color="primary" :label="setting.label" :model-value="setting.enabled"></v-switch>
            <v-select
              :items="audioQualities"
              label="Default Audio Quality"
              color="primary"
              variant="outlined"
              class="mt-4"
              hide-details
            ></v-select>
            <v-select
              :items="playModes"
              label="Default Play Mode"
              color="primary"
              variant="outlined"
              class="mt-4"
              hide-details
            ></v-select>
          </v-card-text>
        </v-card>

        <v-card class="geek-card">
          <v-card-title class="geek-text">
            <v-icon color="primary" size="small" class="mr-2">mdi-lock</v-icon>
            [ PRIVACY_SETTINGS ]
          </v-card-title>
          <v-divider style="opacity: 0.2"></v-divider>
          <v-card-text>
            <v-select
              :items="privacyOptions"
              label="Who can view my listening history"
              color="primary"
              variant="outlined"
              hide-details
            ></v-select>
            <v-switch label="Hide private playlists" color="primary" class="mt-4"></v-switch>
            <v-switch label="Enable comment approval" color="primary" class="mt-2"></v-switch>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="geek-card mb-6">
          <v-card-title class="geek-text">
            <v-icon color="primary" size="small" class="mr-2">mdi-cog-outline</v-icon>
            [ INTERFACE_SETTINGS ]
          </v-card-title>
          <v-divider style="opacity: 0.2"></v-divider>
          <v-card-text>
            <v-select :items="themes" label="Theme" color="primary" variant="outlined" hide-details></v-select>
            <v-select :items="fontSizes" label="Font Size" color="primary" variant="outlined" class="mt-4" hide-details></v-select>
            <v-select :items="lyricsStyles" label="Lyrics Style" color="primary" variant="outlined" class="mt-4" hide-details></v-select>
            <v-switch label="Enable CRT Scanlines" color="primary" class="mt-4"></v-switch>
            <v-switch label="Enable Neon Glow" color="primary" class="mt-2"></v-switch>
          </v-card-text>
        </v-card>

        <v-card class="geek-card">
          <v-card-title class="geek-text">
            <v-icon color="primary" size="small" class="mr-2">mdi-access-point</v-icon>
            [ ACCESSIBILITY ]
          </v-card-title>
          <v-divider style="opacity: 0.2"></v-divider>
          <v-card-text>
            <v-switch label="High Contrast Mode" color="primary"></v-switch>
            <v-switch label="Enable Screen Reader Hints" color="primary" class="mt-2"></v-switch>
            <v-text-field label="Auto-scroll Lyrics Delay (ms)" type="number" color="primary" variant="outlined" class="mt-4" hide-details></v-text-field>
            <v-text-field label="Keyboard Shortcut Preset" color="primary" variant="outlined" class="mt-4" hide-details></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const playbackSettings = [
  { label: 'Autoplay next track', enabled: true },
  { label: 'Enable crossfade', enabled: false },
  { label: 'Show lyrics overlay', enabled: true },
  { label: 'Enable desktop notifications', enabled: true },
]

const audioQualities = ['Standard (128kbps)', 'High (320kbps)', 'Lossless (FLAC)']
const playModes = ['Sequence', 'Loop', 'Single', 'Random']
const privacyOptions = ['Public', 'Followers only', 'Private']
const themes = ['Geek (Default)', 'Dark Mode', 'Light Mode']
const fontSizes = ['Small', 'Medium', 'Large']
const lyricsStyles = ['Matrix', 'Classic', 'Minimal']
</script>

<style scoped>
.settings-center {
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
</style>
