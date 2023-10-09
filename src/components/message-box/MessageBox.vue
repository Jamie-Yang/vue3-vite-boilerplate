<template>
  <div class="message-box-wrapper">
    <div v-if="show" class="message-box-mask" @touchmove.prevent.stop></div>

    <transition name="message-box">
      <div v-show="show" class="message-box" @touchmove.prevent.stop>
        <div class="message-box-content">
          <div v-if="title" class="message-box-title">{{ title }}</div>
          <div v-if="message" class="message-box-message" v-html="message"></div>
        </div>

        <div class="message-box-btns" :class="[`btns-align-${align}`]">
          <template v-for="(btn, index) in buttons" :key="index">
            <button
              type="button"
              class="message-box-btn"
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

<script lang="ts" setup>
interface MessageBoxButton {
  label: string
  emphasize?: boolean
}

withDefaults(
  defineProps<{
    title?: string
    message?: string
    buttons: (string | MessageBoxButton)[]
    align?: 'row' | 'column'
    show: boolean
  }>(),
  {
    buttons: () => ['我知道了'],
    align: 'row',
    show: false,
  },
)

const emit = defineEmits(['btnClick', 'update:show'])

function onClickBtn(index: number): void {
  emit('btnClick', index)
  emit('update:show', false) // 支持sync
}
</script>

<style lang="scss">
.message-box-wrapper {
  position: relative;
  z-index: 9999;
}

.message-box-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgb(0 0 0 / 50%);
}

.message-box {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 280px;
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  border-radius: 12px;
  font-size: 14px;
  overflow: hidden;
  backface-visibility: hidden;

  &-content {
    position: relative;
    padding: 20px;
  }

  &-title {
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
    margin-bottom: 9px;
  }

  &-image {
    display: block;
    max-width: 24px;
    height: 90px;
    margin: 0 auto 15px;
  }

  &-message {
    font-size: 14px;
    line-height: 20px;
    text-align: center;
  }

  &-btn {
    flex: 1;
    height: 44px;
    color: #3a72ef;
    font-size: 16px;
    line-height: 44px;
    background-color: #fff;
    border-top: 1px solid #ebebeb;

    &:focus {
      outline: none;
    }

    &.emphasize {
      font-weight: bold;
    }
  }

  &-btns {
    display: flex;

    &.btns-align-column {
      flex-direction: column;
    }

    &.btns-align-row {
      .message-box-btn:not(:first-child) {
        border-left: 1px solid #ebebeb;
      }
    }
  }
}

.message-box-enter-active,
.message-box-leave-active {
  transition: all 0.2s;
}

.message-box-enter,
.message-box-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.9);
}
</style>
