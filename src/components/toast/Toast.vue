<script lang="ts" setup>
import purify from 'dompurify'
import type { PropType } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import { Spinner, SvgIcon } from '@/components'
import { getSizeStyle } from '@/utils/format'

import type { IconType, ToastPosition } from './types'

const props = defineProps({
  id: { type: String, default: '' },
  message: { type: String, default: '' },
  allowHtml: { type: Boolean, default: false },
  duration: { type: Number, default: 3000 },
  position: { type: String as PropType<ToastPosition>, default: 'middle' },
  icon: { type: String as PropType<IconType | ''>, default: '' },
  iconSize: { type: [Number, String], default: 30 },
})

/* 仅显式开启 HTML 时清洗，普通消息仍按文本渲染。 */
const sanitizedMessage = computed(() => (props.allowHtml ? purify.sanitize(props.message, { USE_PROFILES: { html: true } }) : ''))

const iconStyle = computed(() => getSizeStyle(String(props.iconSize)))

const emit = defineEmits<{ opened: []; close: []; destroy: [] }>()
const { visible, close } = useToast()
defineExpose({ visible, close })

function useToast() {
  const visible = ref(true)
  let timer: number | undefined = undefined

  function startTimer() {
    timer = window.setTimeout(() => {
      if (visible.value) {
        close()
      }
    }, props.duration)
  }

  function clearTimer() {
    clearTimeout(timer)
    timer = undefined
  }

  /* 自动关闭和手动关闭共用入口，只通知一次。 */
  function close() {
    if (!visible.value) return
    visible.value = false
    clearTimer()
    emit('close')
  }

  onMounted(() => {
    if (props.duration > 0) {
      startTimer()
    }
    visible.value = true
  })

  onBeforeUnmount(clearTimer)

  return { visible, close }
}
</script>

<template>
  <transition name="toast" appear @after-enter="emit('opened')" @after-leave="emit('destroy')">
    <div v-show="visible" :id="id" class="toast" :class="[`toast-${position}`]">
      <Spinner v-if="icon === 'loading'" :size="iconSize" color="#fff" />
      <SvgIcon v-else-if="icon === 'success' || icon === 'fail'" :icon="icon" class="toast-icon" :style="iconStyle" aria-hidden="true" />
      <span v-if="allowHtml" class="toast-text" v-html="sanitizedMessage"></span>
      <span v-else class="toast-text">{{ message }}</span>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  max-width: 80%;
  padding: 8px 12px;
  background: rgb(0 0 0 / 70%);
  border-radius: 8px;
  transform: translate3d(-50%, -50%, 0);

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
  flex-shrink: 0;
  margin: 5px 0;
  color: #fff;
}

.toast-text {
  display: block;
  font-size: 14px;
  line-height: 20px;
  color: #fff;
  text-align: center;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
}
</style>
