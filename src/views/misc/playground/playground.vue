<template>
  <div class="view-container">
    <button @click="handleShowToast">showToast</button>
    <button @click="handleCloseToast">closeToast</button>
    <button @click="handleShowDialog">showDialog</button>

    <Loading>加载中...</Loading>

    <SvgIcon name="smiling-face" class="icon" />
  </div>
</template>

<script lang="ts" setup>
import { Loading, SvgIcon } from '@/components'
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
  showDialog({ title: '弹框标题', message: '弹框内容' }).then((index) => {
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

// 好看的按钮样式
button {
  padding: 0 20px;
  margin-top: 8px;
  font-size: 16px;
  line-height: 44px;
  color: #fff;
  cursor: pointer;
  background-color: #409eff;
  border: 1px solid #409eff;
  border-radius: 4px;
}
</style>
