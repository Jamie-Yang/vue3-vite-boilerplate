<template>
  <div class="view-container">
    <button @click="showToast">测试 this.$showToast</button>
    <button @click="showMessageBox">测试 this.$showMessageBox</button>
  </div>
</template>

<script lang="ts">
interface Data {
  [key: string]: unknown
}

export default {
  name: 'Playground',

  setup(): Data {
    return {}
  },

  methods: {
    showToast(): void {
      this.$showToast('test showToast')
    },

    showMessageBox(): void {
      this.$showMessageBox('test showMessageBox')
    },
  },
}
</script>

<style lang="scss" scoped>
.view-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
