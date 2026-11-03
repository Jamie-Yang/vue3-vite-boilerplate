<script lang="ts" setup>
import { watch, ref, onBeforeUnmount } from 'vue'

import { formatRemainTime, convertRemainTime } from '@/utils/format'

const props = defineProps({
  showMs: { type: Boolean, default: false }, // 是否显示毫秒。为了性能考虑，不显示毫秒时，只有在秒数变化时才更新
  remainTime: { type: Number, default: 0 }, // 剩余时间
  format: { type: String, default: 'HH:mm:ss' }, // d天 HH:mm:ss.SSS
})

const emits = defineEmits(['finish'])

const { remain } = useCountDown()

function useCountDown() {
  const rafId = ref(0)
  const remain = ref(0)
  const endingTime = ref(0) // 结束时间 = 当前时间 + 剩余毫秒数

  watch(() => props.remainTime, start, { immediate: true })
  onBeforeUnmount(stop)

  /* 重启前停止旧循环，归零时只更新显示，不触发完成事件。 */
  function start() {
    stop()
    remain.value = Math.max(props.remainTime, 0)
    if (remain.value === 0) return

    endingTime.value = Date.now() + remain.value

    tick()
  }

  /* 重启、结束和卸载共用同一处动画清理。 */
  function stop() {
    window.cancelAnimationFrame(rafId.value)
    rafId.value = 0
  }

  function tick() {
    rafId.value = window.requestAnimationFrame(() => {
      const remainValue = Math.max(endingTime.value - Date.now(), 0)

      if (remainValue === 0) {
        stop()
        remain.value = 0
        emits('finish')
        return
      }

      const isDiffSecond = Math.abs(remainValue - remain.value) > 986 // 17 * 58

      if (props.showMs || isDiffSecond) {
        remain.value = remainValue
      }

      tick()
    })
  }

  return { remain }
}
</script>

<template>
  <slot :remain="convertRemainTime(remain)">{{ formatRemainTime(remain, format) }}</slot>
</template>
