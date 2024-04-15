<template>
  <div class="view-container">
    <button @click="handleShowToast">测试 showToast</button>
    <button @click="handleCloseToast">测试 closeToast</button>
    <button @click="handleShowDialog">测试 showDialog</button>
    <Loading vertical>加载中...</Loading>
  </div>
</template>

<script lang="ts" setup>
import { Loading } from '@/components'
import { showToast, closeToast, showDialog } from '@/components/fn'

function handleShowToast(): void {
  showToast({
    message: 'test showToast',
    // icon: 'loading',
    position: 'top',
    duration: 0,
  })
}

function handleCloseToast(): void {
  closeToast()
}

function handleShowDialog(): void {
  showDialog({
    title: '弹框标题',
    message: '弹框内容',
  }).then((index) => {
    console.log('dialog resolve: ', index)
  })
}
</script>

<style lang="scss" scoped>
.view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
