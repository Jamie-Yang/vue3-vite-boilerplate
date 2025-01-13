<template>
  <div class="demo-section">
    <p class="section-title">{{ title }}</p>
    <p v-if="desc" class="section-desc">{{ desc }}</p>

    <div class="section-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: { type: String, required: true },
  desc: { type: String, default: '' },
})
</script>

<style lang="scss" scoped>
.demo-section {
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;

  & + & {
    margin-top: 15px;
  }

  .section-title {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }

  .section-desc {
    margin-bottom: 15px;
    font-size: 14px;
    color: #666;
  }
}
</style>
