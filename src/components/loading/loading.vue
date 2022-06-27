<template>
  <div class="loading" :class="{ 'loading-vertical': vertical }">
    <div class="spinner" :style="{ ...getSizeStyle(size) }">
      <svg class="spinner-circular" viewBox="25 25 50 50" :style="{ color }">
        <circle cx="50" cy="50" r="20" fill="none" />
      </svg>
    </div>
    <span class="text" :style="{ fontSize: `${textSize}px`, color }"><slot /></span>
  </div>
</template>

<script lang="ts" setup>
import { getSizeStyle } from '@/utils/format'

defineProps({
  size: { type: [Number, String], default: 20 },
  vertical: Boolean,
  textSize: { type: Number, default: 14 },
  color: String,
})
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  align-items: center;
}

.spinner {
  width: 20px;
  height: 20px;
  animation: rotate 0.75s 0s linear infinite;
}

.spinner-circular {
  display: block;
  width: 100%;
  height: 100%;
  color: #969799;

  circle {
    animation: circular 1.5s ease-in-out infinite;
    stroke: currentcolor;
    stroke-width: 3;
    stroke-linecap: round;
  }
}

.text {
  color: #969799;
  font-size: 14px;
  line-height: 20px;
  margin-left: 8px;
}

.loading-vertical {
  flex-direction: column;

  .text {
    margin: 8px 0 0;
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
