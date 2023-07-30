<template>
  <main class="page">
    <section v-if="store.itemsForCurrentPage.length">
      <Card
        v-for="catalogItem in store.itemsForCurrentPage"
        :key="catalogItem.key"
        :card="catalogItem"
        class="page__card"
      />

      <Pagination class="page__pagination" />
    </section>

    <p
      v-else-if="isFilledFilter"
      class="page__empty-text"
    >There are no data matched to your filter</p>

    <p
      v-else
      class="page__empty-text"
    >Empty data</p>
  </main>
</template>

<script setup lang="ts">
import useStore from '@/store';
import Card from '@/components/Card.vue';
import Pagination from '@/components/Pagination.vue';
import { computed } from 'vue';

const store = useStore();

const isFilledFilter = computed(() => {
  return Object.values(store.filter).filter(item => typeof item !== 'undefined');
});
</script>

<style scoped lang="sass">
.page
  &__card:last-of-type
    margin-bottom: 0

  &__pagination
    margin-top: 16px

  &__card
    margin-bottom: 16px

  &__empty-text
    text-align: center
    padding: 16px 0
</style>
