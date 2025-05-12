<script lang="ts" setup>
import { watch, onMounted, onBeforeUnmount } from 'vue'

type ScrollElement = Window | HTMLElement

const props = defineProps<{
  isLoading: boolean
  loadingText: string
  noMore: boolean
  noMoreText: string
  scrollElement: ScrollElement
}>()

const emits = defineEmits(['reach-end'])

watch(
  () => props.scrollElement,
  (newEl, oldEl) => {
    if (newEl === oldEl) return
    unbindScroll(oldEl)
    bindScroll()
  },
)

onMounted(() => {
  bindScroll()
})

onBeforeUnmount(() => {
  unbindScroll()
})

function onScroll(): void {
  if (props.isLoading || props.noMore) return

  const el = props.scrollElement
  const isWindow = el === window

  const scrollTop = isWindow ? window.scrollY : (el as HTMLElement).scrollTop
  const scrollHeight = isWindow ? document.documentElement.scrollHeight || document.body.scrollHeight : (el as HTMLElement).scrollHeight
  const elHeight = isWindow ? window.innerHeight : (el as HTMLElement).offsetHeight

  const distance = scrollHeight - scrollTop - elHeight

  if (distance <= 30) {
    emits('reach-end')
  }
}

function bindScroll(): void {
  props.scrollElement.addEventListener('scroll', onScroll)
}

function unbindScroll(el?: ScrollElement): void {
  el = el || props.scrollElement
  el.removeEventListener('scroll', onScroll)
}
</script>

<template>
  <div class="scroll-load">
    <i v-show="isLoading" class="load-icon"></i>
    <span class="load-label">{{ noMore ? noMoreText : loadingText }}</span>
  </div>
</template>

<style lang="scss" scoped>
.scroll-load {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

.load-icon {
  display: block;
  width: 14px;
  height: 14px;
  margin-right: 10px;
  background: url('./images/loading.png') center center no-repeat;
  background-size: 14px 14px;
  animation: rotate 0.75s linear infinite;
}

.load-label {
  font-size: 12px;
  line-height: 20px;
  color: #8c8fa7;
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}
</style>
