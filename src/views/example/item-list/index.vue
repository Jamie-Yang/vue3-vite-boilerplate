<template>
  <div class="view-container">
    <ListItem v-for="n in 10" :key="n" />
  </div>
</template>

<script lang="ts" setup>
import ListItem from './components/ListItem.vue'
</script>

<style lang="scss" scoped>
.view-container {
  padding: 20px;
}
</style>
