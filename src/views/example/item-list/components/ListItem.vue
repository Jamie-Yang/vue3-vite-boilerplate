<script lang="ts" setup></script>

<template>
  <div class="item-container"></div>
</template>

<style lang="scss" scoped>
.item-container {
  height: 120px;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 6px;

  & + & {
    margin-top: 20px;
  }
}
</style>
