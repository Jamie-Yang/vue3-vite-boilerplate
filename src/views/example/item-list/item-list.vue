<template>
  <div class="view-container">
    <ListItem v-for="n in 10" :key="n" />
  </div>
</template>

<script lang="ts">
import ListItem from './components/ListItem.vue'

interface Data {
  [key: string]: unknown
}

export default {
  name: 'ItemList',

  components: { ListItem },

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
