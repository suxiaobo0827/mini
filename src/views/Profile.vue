<template>
  <section class="page profile-page">
    <header class="profile-card">
      <div class="profile-card__avatar">M</div>
      <div>
        <h1>Mini Mobile</h1>
        <p>Vue 3 移动端测试项目</p>
      </div>
    </header>

    <CellGroup inset>
      <Cell title="技术栈" value="Vue 3 + Vant" />
      <Cell title="状态管理" value="Pinia" />
      <Cell title="路由" value="Vue Router" />
      <Cell title="样式" value="SCSS" />
    </CellGroup>
  </section>
</template>

<script setup>
import { Cell, CellGroup } from 'vant'
</script>
