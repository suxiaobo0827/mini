<template>
  <section class="page home-page">
    <header class="hero-card">
      <span class="hero-card__eyebrow">Vue 3 Mobile Starter</span>
      <h1>移动端项目模板</h1>
      <p>Vue 3 + Vite + Vue Router + Pinia + Vant + SCSS</p>
    </header>

    <section class="status-card">
      <div class="status-card__icon">✓</div>
      <div>
        <h2>GitHub 协作链路已打通</h2>
        <p>这份页面由 ChatGPT 直接写入远程仓库。</p>
      </div>
    </section>

    <section class="panel">
      <div class="panel__header">
        <h2>模板能力</h2>
        <span>基础版</span>
      </div>

      <div class="feature-grid">
        <div v-for="item in features" :key="item.title" class="feature-item">
          <strong>{{ item.title }}</strong>
          <span>{{ item.desc }}</span>
        </div>
      </div>
    </section>

    <section class="panel counter-panel">
      <div>
        <h2>Pinia 状态测试</h2>
        <p>当前点击次数：{{ appStore.visitCount }}</p>
      </div>
      <Button type="primary" round size="small" @click="appStore.increaseVisitCount">
        点我 +1
      </Button>
    </section>
  </section>
</template>

<script setup>
import { Button } from 'vant'
import { useAppStore } from '../stores/app'

const appStore = useAppStore()

const features = [
  { title: 'Vue Router', desc: '移动端页面路由' },
  { title: 'Pinia', desc: '全局状态管理' },
  { title: 'Vant 4', desc: '移动端 UI 组件' },
  { title: 'SCSS', desc: '统一样式组织' },
]
</script>
