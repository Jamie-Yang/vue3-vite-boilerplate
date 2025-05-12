<script lang="ts" setup>
import type { DialogButton } from './type'

defineProps({
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  buttons: { type: Array as PropType<DialogButton[]>, default: () => ['我知道了'] },
  align: { type: String as PropType<'row' | 'column'>, default: 'row' },
  show: { type: Boolean, default: false },
})

const emits = defineEmits(['btn-click', 'update:show'])

function onClickBtn(index: number): void {
  emits('btn-click', index)
  emits('update:show', false) // 支持sync
}
</script>

<template>
  <div class="dialog-wrapper">
    <transition name="fade">
      <div v-if="show" class="dialog-mask" @touchmove.prevent.stop></div>
    </transition>

    <transition name="dialog">
      <div v-show="show" class="dialog" @touchmove.prevent.stop>
        <div class="dialog-content">
          <div v-if="title" class="dialog-title">{{ title }}</div>
          <div v-if="message" class="dialog-message" v-html="message"></div>
        </div>

        <div class="dialog-buttons" :class="[`buttons-align-${align}`]">
          <template v-for="(btn, index) in buttons" :key="index">
            <button
              type="button"
              class="dialog-btn"
              :class="[typeof btn === 'object' && btn.emphasize ? 'emphasize' : '']"
              @click="onClickBtn(index)"
            >
              {{ typeof btn === 'object' ? btn.label : btn }}
            </button>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.dialog-wrapper {
  position: relative;
  z-index: 1999;
}

.dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 50%);
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 280px;
  overflow: hidden;
  font-size: 14px;
  background-color: #fff;
  border-radius: 12px;
  transform: translate3d(-50%, -50%, 0);
  backface-visibility: hidden;

  .dialog-content {
    position: relative;
    padding: 20px;
  }

  .dialog-title {
    margin-bottom: 9px;
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
  }

  .dialog-image {
    display: block;
    max-width: 24px;
    height: 90px;
    margin: 0 auto 15px;
  }

  .dialog-message {
    font-size: 14px;
    line-height: 20px;
    text-align: center;
  }

  .dialog-btn {
    flex: 1;
    height: 44px;
    font-size: 16px;
    line-height: 44px;
    color: #3a72ef;
    background-color: #fff;
    border-top: 1px solid #ebebeb;

    &:focus {
      outline: none;
    }

    &.emphasize {
      font-weight: bold;
    }
  }

  .dialog-buttons {
    display: flex;

    &.buttons-align-column {
      flex-direction: column;
    }

    &.buttons-align-row {
      .dialog-btn:not(:first-child) {
        border-left: 1px solid #ebebeb;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.2s;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.95);
}
</style>
