<script lang="ts" setup>
import { Spinner, SpinnerIcon } from '@/components'
</script>

<template>
  <div class="view-container">
    <div class="demo-section">
      <h3>SpinnerIcon（只有转圈）</h3>
      <div class="demo-row">
        <SpinnerIcon type="circular" />
        <SpinnerIcon type="spinner" />
        <SpinnerIcon type="circular" size="32" color="#007aff" />
        <SpinnerIcon type="spinner" size="32" color="#ff4444" />
      </div>
    </div>

    <div class="demo-section">
      <h3>Spinner（带文字的转圈）</h3>
      <div class="demo-row">
        <Spinner>加载中...</Spinner>
        <Spinner type="spinner">处理中...</Spinner>
        <Spinner type="circular" size="32" color="#007aff" textColor="#007aff">请稍候...</Spinner>
      </div>
    </div>

    <div class="demo-section">
      <h3>Spinner（带文字的转圈、垂直方向）</h3>
      <div class="demo-row">
        <Spinner vertical>加载中...</Spinner>
        <Spinner type="spinner" vertical>处理中...</Spinner>
        <Spinner type="circular" size="32" color="#007aff" textColor="#007aff" vertical>请稍候...</Spinner>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.view-container {
  min-height: 100vh;
  padding: 20px;
}

.demo-section {
  margin-bottom: 40px;

  h3 {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 500;
    color: #333;
  }
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  align-items: center;
}
</style>
