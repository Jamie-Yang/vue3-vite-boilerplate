<template>
  <div class="home">
    <img alt="Vue logo" src="./images/logo.png" />
    <HelloWorld @click="showToast" msg="Welcome to Your Vue3 Mobile" />
  </div>
</template>

<script lang="ts">
import HelloWorld from './components/hello-world.vue'
import { useLoading } from '@/components/ui/loading'

interface Data {
  [key: string]: unknown
}

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup(): Data {
    console.log(process.env.NODE_ENV)

    const Loading = useLoading()

    function showLoading() {
      Loading.show()
    }

    return {
      showLoading,
    }
  },
}
</script>
