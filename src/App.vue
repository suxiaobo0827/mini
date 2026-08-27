<template>
  <div class="app-shell">
    <main :class="['app-content', { 'app-content--fullscreen': route.meta.hideTabbar }]">
      <RouterView />
    </main>

    <AppTabbar v-if="!route.meta.hideTabbar" />
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import AppTabbar from './components/AppTabbar.vue'

const route = useRoute()
</script>
