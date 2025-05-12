<script lang="ts" setup>
import { showToast, closeToast, showDialog } from '@/components/fn'

import { DemoPage, DemoSection } from '../components'

async function handleShowDialog(): Promise<void> {
  const index = await showDialog({ title: '弹框标题', message: '弹框内容' })
  console.log('dialog resolve: ', index)
}
</script>

<template>
  <DemoPage title="---">
    <DemoSection title="Toast" desc="">
      <button @click="showToast('文字提示')">文字提示</button>
      <button @click="showToast({ icon: 'loading', message: '加载中...' })">加载提示</button>
      <button @click="showToast({ icon: 'success', message: '成功文案' })">成功提示</button>
      <button @click="showToast({ icon: 'fail', message: '失败文案' })">失败提示</button>
      <button @click="closeToast">手动关闭</button>
    </DemoSection>

    <DemoSection title="Dialog" desc="">
      <button @click="handleShowDialog">showDialog</button>
    </DemoSection>
  </DemoPage>
</template>

<style lang="scss" scoped>
button {
  width: 100%;
  padding: 0 20px;
  font-size: 16px;
  line-height: 44px;
  color: #fff;
  cursor: pointer;

  // background-color: #409eff;
  // border: 1px solid #409eff;
  border-radius: 4px;

  & + & {
    margin-top: 10px;
  }
}
</style>
