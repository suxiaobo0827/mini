<template>
  <div class="app-shell">
    <main class="app-content">
      <RouterView />
    </main>

    <AppTabbar />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppTabbar from './components/AppTabbar.vue'
</script>
