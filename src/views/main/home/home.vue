<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue3 Mobile" />
    <SvgIcon name="smiling-face" class="icon" />
  </div>
</template>

<script lang="ts" setup>
import { SvgIcon } from '@/components/'

import HelloWorld from './components/HelloWorld.vue'
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
}

.icon {
  width: 40px;
  height: 40px;
}
</style>
