<template>
  <div class="view-container">
    <button @click="onClick">测试</button>
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
    onClick(): void {
      this.$showToast('test')
    },
  },
}
</script>

<style lang="scss" scoped>
.view-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
