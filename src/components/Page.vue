<template>
  <main class="page">
    <Card
      v-for="catalogItem in store.catalog"
      :key="catalogItem.key"
      :card="catalogItem"
      class="card"
    />
  </main>
</template>

<script setup lang="ts">
import useStore from '@/store';
import Card from '@/components/Card.vue';

const store = useStore();
</script>

<style scoped lang="sass">
.card
  margin-bottom: 16px
</style>
