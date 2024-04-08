<template>
  <transition name="toast" @after-leave="$emit('destroy')">
    <div v-show="visible" :id="id" class="toast" :class="[`toast-${position}`]">
      <Loading v-if="icon === 'loading'" :size="iconSize" color="#fff" />
      <span class="toast-text" v-html="message"></span>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { Loading } from '@/components'

const props = defineProps({
  id: { type: String, default: '' },
  message: { type: String, default: '' },
  duration: { type: Number, default: 3000 },
  position: { type: String, default: 'middle' },
  icon: { type: String, default: '' },
  iconSize: { type: [Number, String], default: 36 },
})

defineEmits(['destroy'])

const visible = ref(true)
let timer: number | undefined = undefined

function startTimer() {
  timer = setTimeout(() => {
    if (visible.value) {
      close()
    }
  }, props.duration)
}

function clearTimer() {
  clearTimeout(timer)
  timer = undefined
}

function close() {
  visible.value = false
  clearTimer()
}

onMounted(() => {
  if (props.duration > 0) {
    startTimer()
  }
  visible.value = true
})

defineExpose({
  visible,
})
</script>

<style lang="scss" scoped>
.toast {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 80%;
  min-width: 180px;
  padding: 8px 12px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background: rgb(0 0 0 / 70%);
  border-radius: 8px;
  z-index: 1000;

  &.toast-top {
    top: 20%;
  }

  &.toast-middle {
    top: 50%;
    left: 50%;
  }

  &.toast-bottom {
    top: auto;
    bottom: 20%;
  }
}

.toast-icon {
  display: block;
  color: #fff;
  font-size: 37px;
  line-height: 37px;
  text-align: center;
  margin: 0 auto 40px;
}

.toast-text {
  display: block;
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s;
}

.toast-enter,
.toast-leave-to {
  opacity: 0;
}
</style>
