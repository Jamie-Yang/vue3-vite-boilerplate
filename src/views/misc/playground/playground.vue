<template>
  <div class="view-container">
    <button @click="showToast">测试 this.$toast</button>
    <button @click="showMessageBox">测试 this.$messageBox</button>
    <button @click="showLoading">测试 this.$showLoading</button>

    <CountDown :remainTime="10000000" :ms="false" v-slot="slotProps">
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
import { defineComponent } from 'vue'
import { CountDown } from '@/components'

export default defineComponent({
  name: 'Playground',

  components: { CountDown },

  methods: {
    showToast(): void {
      this.$toast('test showToast')
    },

    showMessageBox(): void {
      this.$messageBox('test messageBox').then((index) => {
        console.log('messageBox resolve: ', index)
      })
    },

    showLoading(): void {
      this.$loading('test showLoading')

      setTimeout(() => {
        this.$loading(false)
      }, 2000)
    },
  },
})
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
