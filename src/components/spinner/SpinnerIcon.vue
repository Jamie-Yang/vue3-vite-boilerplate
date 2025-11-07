<script lang="tsx" setup>
import { getSizeStyle } from '@/utils/format'

interface Props {
  /** 类型 */
  type?: 'circular' | 'spinner'
  /** 大小 */
  size?: number | string
  /** 颜色 */
  color?: string
}

withDefaults(defineProps<Props>(), {
  type: 'circular',
  size: 24,
  color: '#969799',
})
</script>

<template>
  <div class="spinner-icon" :class="[type]" :style="{ ...getSizeStyle(size), color }">
    <div v-if="type === 'spinner'" class="icon-spinner">
      <div v-for="(_, index) in 12" :key="index" class="spinner-line" :class="`line-${index + 1}`" />
    </div>

    <svg v-if="type === 'circular'" class="icon-circular" viewBox="25 25 50 50">
      <circle cx="50" cy="50" r="20" fill="none" />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:math';

.spinner-icon {
  width: 20px;
  height: 20px;
  animation: rotate 0.8s 0s linear infinite;

  &.spinner {
    animation-timing-function: steps(12);
  }
}

.spinner-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &::before {
    display: block;
    width: 2px;
    height: 25%;
    margin: 0 auto;
    content: ' ';
    background-color: currentcolor;
    border-radius: 40%;
  }
}

@for $i from 1 through 12 {
  .line-#{$i} {
    opacity: 1 - math.div(0.75, 12) * ($i - 1);
    transform: rotate($i * 30deg);
  }
}

.icon-circular {
  display: block;
  width: 100%;
  height: 100%;

  circle {
    stroke: currentcolor;
    stroke-width: 3;
    stroke-linecap: round;
    animation: circular 1.5s ease-in-out infinite;
  }
}

@keyframes circular {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40;
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}
</style>
