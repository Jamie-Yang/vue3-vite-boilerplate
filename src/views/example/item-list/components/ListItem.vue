<template>
  <div class="item-container"></div>
</template>

<script lang="ts" setup>
interface Data {
  [key: string]: unknown
}
</script>

<style lang="scss" scoped>
.item-container {
  height: 120px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 6px;
  overflow: hidden;

  & + & {
    margin-top: 20px;
  }
}
</style>
