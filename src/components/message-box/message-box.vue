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
              :class="[
                typeof btn === 'object' && btn.emphasize ? 'emphasize' : '',
                typeof btn === 'object' && btn.cssClass ? btn.cssClass : '',
              ]"
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

<script lang="ts">
export default {
  emits: ['onclickbtn', 'update:show'],
  props: {
    title: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    buttons: {
      type: Array,
      default: (): string[] => [''],
    },
    align: {
      type: String,
      default: 'row',
    },
    show: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onClickBtn(index: number): void {
      this.$emit('onclickbtn', index)
      this.$emit('update:show', false) // 支持sync
    },
  },
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
  background-color: rgba(0, 0, 0, 0.5);
}

.message-box {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 5.6rem;
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  border-radius: 0.24rem;
  font-size: 0.26rem;
  overflow: hidden;
  backface-visibility: hidden;

  &-content {
    position: relative;
    padding: 0.4rem;
  }

  &-title {
    color: #2d2f46;
    font-size: 0.34rem;
    line-height: 0.48rem;
    text-align: center;
    margin-bottom: 0.18rem;
  }

  &-image {
    display: block;
    max-width: 4.8rem;
    height: 1.8rem;
    margin: 0 auto 0.3rem;
  }

  &-message {
    color: #030303;
    font-size: 0.26rem;
    line-height: 0.38rem;
    text-align: center;
  }

  &-btn {
    flex: 1;
    height: 0.88rem;
    color: #3a72ef;
    font-size: 0.34rem;
    line-height: 0.88rem;
    background-color: #fff;
    border-top: 1px solid #ebebeb;

    &:focus {
      outline: none;
    }

    &.emphasize {
      font-weight: 500;
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
