<template>
  <main class="page">
    <Card
      v-for="catalogItem in store.itemsForCurrentPage"
      :key="catalogItem.key"
      :card="catalogItem"
      class="card"
    />

    <Pagination class="pagination" />
  </main>
</template>

<script setup lang="ts">
import useStore from '@/store';
import Card from '@/components/Card.vue';
import Pagination from '@/components/Pagination.vue';

const store = useStore();
</script>

<style scoped lang="sass">
.card
  margin-bottom: 16px

.page .card:last-of-type
  margin-bottom: 0

.pagination
  margin-top: 8px
</style>
