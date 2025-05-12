<script lang="ts" setup>
import { watch, ref } from 'vue'

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
  const endingTime = ref(0) // 结束时间 = 当前时间 + 剩余秒数

  watch(() => props.remainTime, start, { immediate: true })

  function start() {
    if (!props.remainTime) return

    remain.value = props.remainTime
    endingTime.value = Date.now() + props.remainTime

    tick()
  }

  function tick() {
    rafId.value = window.requestAnimationFrame(() => {
      const remainValue = Math.max(endingTime.value - Date.now(), 0)

      if (remainValue === 0) {
        window.cancelAnimationFrame(rafId.value)
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
