<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps({
  icon: { type: String, required: true },
})

/* 在计算属性中读取名称，使图标变化时创建对应的异步组件。 */
const SvgIcon = computed(() => {
  const icon = props.icon
  return defineAsyncComponent(() => import(`@/assets/svg-icons/${icon}.svg`))
})
</script>

<template>
  <SvgIcon class="svg-icon" />
</template>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
}
</style>
