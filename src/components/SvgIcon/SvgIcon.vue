<template>
  <Icon />
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
})

const Icon = defineAsyncComponent(() => import(`../../assets/icons/${props.name}.svg`))
</script>
