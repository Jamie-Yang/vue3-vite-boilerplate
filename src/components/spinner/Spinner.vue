<script lang="tsx" setup>
import SpinnerIcon from './SpinnerIcon.vue'

interface Props {
  /** 类型 */
  type?: 'circular' | 'spinner'
  /** 大小 */
  size?: number | string
  /** 垂直方向 */
  vertical?: boolean
  /** 文字大小 */
  textSize?: number
  /** 颜色 */
  color?: string
  /** 文字颜色 */
  textColor?: string
}

withDefaults(defineProps<Props>(), {
  type: 'circular',
  size: 24,
  vertical: false,
  textSize: 14,
  color: '#969799',
  textColor: '#969799',
})
</script>

<template>
  <div class="spinner" :class="{ 'spinner-vertical': vertical }">
    <SpinnerIcon :type="type" :size="size" :color="color" />

    <span class="text" :style="{ fontSize: `${textSize}px`, color: textColor }"><slot /></span>
  </div>
</template>

<style lang="scss" scoped>
.spinner {
  display: flex;
  align-items: center;
  margin: 5px 0;
}

.text {
  margin-left: 8px;
  font-size: 14px;
  line-height: 20px;
  color: #969799;
}

.spinner-vertical {
  flex-direction: column;

  .text {
    margin: 8px 0 0;
  }
}
</style>
