<template>
  <div class="item-container"></div>
</template>

<script lang="ts">
interface Data {
  [key: string]: unknown
}

export default {
  name: 'ListItem',

  setup(): Data {
    return {}
  },

  methods: {},
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
