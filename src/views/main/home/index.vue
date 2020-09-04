<template>
  <div class="home">
    <img alt="Vue logo" src="./images/logo.png" />
    <HelloWorld @click="onClick" msg="Welcome to Your Vue3 Mobile" />
  </div>
</template>

<script lang="ts">
import HelloWorld from './components/hello-world.vue'
// import { useLoading } from '@/components/ui/loading'
// import { useToast } from '@/components/ui/toast'

interface Data {
  [key: string]: unknown
}

export default {
  name: 'Home',

  components: { HelloWorld },

  setup(): Data {
    console.log(process.env.NODE_ENV)

    // const Loading = useLoading()
    // const showToast = useToast()

    // function showLoading() {
    //   Loading.show()
    // }

    // function showToast() {
    //   Toast.show({
    //     message: '提示信息',
    //   })
    // }

    return {
      // showLoading,
      // showToast,
    }
  },

  methods: {
    onClick(): void {
      // this.$showToast('提示')
    },
  },
}
</script>
