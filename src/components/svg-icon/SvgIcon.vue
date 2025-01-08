<template>
  <Icon style="width: 1em; height: 1em" />
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
})

const Icon = defineAsyncComponent(() => import(`@/assets/svg-icons/${props.name}.svg`))
</script>
