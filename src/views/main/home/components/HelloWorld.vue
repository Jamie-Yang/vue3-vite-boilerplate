<script lang="ts" setup>
defineProps({
  msg: { type: String, default: '' },
})
</script>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>
