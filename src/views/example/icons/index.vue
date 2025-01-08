<template>
  <div class="view-container">
    <h1>图标示例</h1>

    <div class="icon-container">
      <div class="icon-item">
        <p class="icon-title">.svg + vite-svg-loader</p>
        <SvgIcon name="smiling-face" class="icon" />
      </div>

      <div class="icon-item">
        <p class="icon-title">iconify/vue</p>
        <Icon icon="mdi:home" class="icon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'

import { SvgIcon } from '@/components'
</script>

<style lang="scss" scoped>
.view-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.icon-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
}

.icon-title {
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
}

.icon {
  font-size: 40px;
}
</style>
