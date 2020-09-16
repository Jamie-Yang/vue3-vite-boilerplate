<template>
  <div class="view-container">
    <Item v-for="n in 10" :key="n" />
  </div>
</template>

<script lang="ts">
import Item from './components/item.vue'

interface Data {
  [key: string]: unknown
}

export default {
  name: 'ItemList',

  components: { Item },

  setup(): Data {
    return {}
  },

  methods: {},
}
</script>

<style lang="scss" scoped>
.view-container {
  padding: 20px;
}
</style>
