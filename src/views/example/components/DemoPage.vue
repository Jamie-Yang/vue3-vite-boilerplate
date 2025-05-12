<script lang="ts" setup>
defineProps({
  title: { type: String, required: true },
})
</script>

<template>
  <div class="view-container">
    <h1 class="view-title">{{ title }}</h1>

    <slot />
  </div>
</template>

<style lang="scss" scoped>
.view-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}

.view-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}
</style>
