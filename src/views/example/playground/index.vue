<template>
  <div class="view-container">
    <Loading>加载中...</Loading>
  </div>
</template>

<script lang="ts" setup>
import { Loading } from '@/components'
</script>

<style lang="scss" scoped>
.view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
