<template>
  <DemoPage title="图标示例">
    <DemoSection title=".svg + vite-svg-loader" desc="将 SVG 文件以 Vue 组件的形式导入使用，适合项目自定义的图标。">
      <SvgIcon icon="smiling-face" class="icon" />
      <SvgIcon icon="note-yellow" class="icon" />
    </DemoSection>

    <DemoSection title="iconify/vue" desc="按需加载海量图标库，适合快速开发。">
      <Icon icon="lucide:smile" class="icon" />
      <Icon icon="mdi:sticker-text-outline" class="icon" />
      <Icon icon="devicon:github-wordmark" class="icon" />
    </DemoSection>
  </DemoPage>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'

import { SvgIcon } from '@/components'

import { DemoPage, DemoSection } from '../components'
</script>

<style lang="scss" scoped>
.icon {
  width: 1.5em;
  font-size: 40px;
}
</style>
