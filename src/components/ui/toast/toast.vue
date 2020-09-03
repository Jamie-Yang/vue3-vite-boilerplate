<template>
  <transition name="toast">
    <div v-show="show" class="toast-wrapper">
      <div class="toast">
        <span class="toast-message" v-html="message"></span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
interface Data {
  [key: string]: unknown
}

export default {
  // props: {
  //   message: {
  //     type: String,
  //     default: '',
  //   },
  //   show: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },

  data(): Data {
    return {
      timer: 0,
      message: '',
      show: false,
    }
  },

  watch: {
    show(val: boolean): void {
      if (val) {
        console.log(val)
      }
    },
  },

  methods: {},
}
</script>

<style lang="scss">
.toast-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 20%;
  z-index: 1000;
}

.toast {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 0.25rem;
  padding: 0.3rem 0.4rem;
  max-width: 80%;
  min-width: 1.9rem;

  .toast-icon {
    display: block;
    color: #fff;
    font-size: 0.74rem;
    line-height: 0.74rem;
    text-align: center;
    margin: 0 auto 0.16rem;
  }

  .toast-message {
    display: block;
    color: #fff;
    font-size: 0.28rem;
    line-height: 0.4rem;
    text-align: center;
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s;
}

.toast-enter,
.toast-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
