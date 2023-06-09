<template>
  <div class="scroll-load">
    <i v-show="isLoading" class="load-icon"></i>
    <span class="load-label">{{ noMore ? noMoreText : loadingText }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type ScrollElement = Window | HTMLElement

export default defineComponent({
  name: 'ScrollLoad',

  props: {
    isLoading: { type: Boolean, default: false, required: true },
    loadingText: { type: String, default: '加载中...' },
    noMore: { type: Boolean, default: false, required: true },
    noMoreText: { type: String, default: '没有更多数据了' },
    scrollElement: { type: [Window, HTMLElement], default: (): Window => window },
  },

  emits: ['reach-end'],

  watch: {
    scrollElement(newEl: ScrollElement, oldEl: ScrollElement): void {
      if (newEl === oldEl) return
      this.unbindScroll(oldEl)
      this.bindScroll()
    },
  },

  mounted(): void {
    this.bindScroll()
  },

  beforeUnmount(): void {
    this.unbindScroll()
  },

  methods: {
    onScroll(): void {
      if (this.isLoading || this.noMore) return

      const el = this.scrollElement
      const isWindow = el === window

      const scrollTop = isWindow ? window.scrollY : (el as HTMLElement).scrollTop
      const scrollHeight = isWindow
        ? document.documentElement.scrollHeight || document.body.scrollHeight
        : (el as HTMLElement).scrollHeight
      const elHeight = isWindow ? window.innerHeight : (el as HTMLElement).offsetHeight

      const distance = scrollHeight - scrollTop - elHeight

      if (distance <= 30) {
        this.$emit('reach-end')
      }
    },

    bindScroll(): void {
      this.scrollElement.addEventListener('scroll', this.onScroll)
    },

    unbindScroll(el?: ScrollElement): void {
      el = el || this.scrollElement
      el.removeEventListener('scroll', this.onScroll)
    },
  },
})
</script>

<style lang="scss" scoped>
.scroll-load {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
}

.load-icon {
  display: block;
  width: 0.28rem;
  height: 0.28rem;
  margin-right: 0.2rem;
  background: url('./images/loading.png') center center no-repeat;
  background-size: 0.28rem 0.28rem;
  animation: rotate 0.75s linear infinite;
}

.load-label {
  color: #8c8fa7;
  font-size: 0.24rem;
  line-height: 0.4rem;
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}
</style>
