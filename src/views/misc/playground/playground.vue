<template>
  <div class="view-container">
    <button @click="showToast">测试 this.$toast</button>
    <button @click="hideToast">测试 this.$toast</button>
    <button @click="showMessageBox">测试 this.$messageBox</button>
    <Loading vertical>加载中...</Loading>
  </div>
</template>

<script lang="ts" setup>
import { Loading } from '@/components'
import { Toast, MessageBox } from '@/components/fn'

function showToast(): void {
  Toast({
    message: 'test showToast',
    icon: 'loading',
    duration: 0,
  })
}

function hideToast(): void {
  Toast.hide()
}

function showMessageBox(): void {
  MessageBox('test messageBox').then((index) => {
    console.log('messageBox resolve: ', index)
  })
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
