<template>
  <Tabbar v-model="active" route safe-area-inset-bottom>
    <TabbarItem replace to="/" icon="home-o">首页</TabbarItem>
    <TabbarItem replace to="/profile" icon="user-o">我的</TabbarItem>
  </Tabbar>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Tabbar, TabbarItem } from 'vant'

const route = useRoute()

const active = computed(() => (route.path === '/profile' ? 1 : 0))
</script>
