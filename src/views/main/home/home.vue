<template>
  <div class="home">
    <img alt="Vue logo" src="./images/logo.png" />
    <HelloWorld @click="onClick" msg="Welcome to Your Vue3 Mobile" />
  </div>
</template>

<script lang="ts">
import HelloWorld from './components/hello-world.vue'

export default {
  name: 'Home',

  components: { HelloWorld },
}
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
}
</style>
