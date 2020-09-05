<template>
  <transition name="scale">
    <div v-show="isShow" class="loading-wrapper">
      <div class="loading-block">
        <img src="./images/loading-white.png" class="loading-icon" />
        <div class="loading-tips">{{ message }}</div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
interface Data {
  [key: string]: unknown
}

export default {
  name: 'Loading',

  data(): Data {
    return {
      isShow: false,
      message: '加载中...',
    }
  },

  methods: {
    show(message = '加载中...'): void {
      this.isShow = true
      this.message = message
    },
  },
}
</script>

<style type="scss" scoped>
.loading-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9000;
}

.loading-block {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 0.25rem;
  padding: 0.3rem 0.4rem;
}

.loading-icon {
  display: block;
  width: 0.74rem;
  height: 0.74rem;
  margin: 0 auto 0.16rem;
  animation: rotate 0.75s 0s linear infinite;
}

.loading-tips {
  color: #fff;
  font-size: 0.28rem;
  line-height: 0.4rem;
  text-align: center;
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

.scale-leave-active {
  animation: scale 0.35s ease-in;
}

@keyframes scale {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  35% {
    opacity: 0.5;
  }

  70% {
    opacity: 0;
  }

  100% {
    transform: scale(0.3);
    opacity: 0;
  }
}
</style>
