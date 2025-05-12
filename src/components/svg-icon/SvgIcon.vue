<script lang="tsx" setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  icon: { type: String, required: true },
})

const SvgIcon = defineAsyncComponent(() => import(`@/assets/svg-icons/${props.icon}.svg`))
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
