<template>
  <div class="view-container">
    <button @click="showToast">测试 this.$showToast</button>
    <button @click="showMessageBox">测试 this.$showMessageBox</button>
    <button @click="showLoading">测试 this.$showLoading</button>
    <CountDown :remianTime="10000000" :ms="false" v-slot="slotProps">
      {{ JSON.stringify(slotProps.remain) }}
      <br />
      {{ slotProps.remain.hours }}
      {{ slotProps.remain.minutes }}
      {{ slotProps.remain.seconds }}
      {{ slotProps.remain.milliseconds }}
    </CountDown>
  </div>
</template>

<script lang="ts">
import CountDown from '@/components/count-down/count-down.vue'

interface Data {
  [key: string]: unknown
}

export default {
  name: 'Playground',

  components: { CountDown },

  setup(): Data {
    return {}
  },

  methods: {
    showToast(): void {
      this.$showToast('test showToast')
    },

    showMessageBox(): void {
      this.$showMessageBox('test showMessageBox').then((index) => {
        console.log('showMessageBox resolve: ', index)
      })
    },

    showLoading(): void {
      this.$showLoading('test showLoading')
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
