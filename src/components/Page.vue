<template>
  <main class="page">
    <section class="page__header">
      <span class="page__all-count">{{ store.countAllItems }} results</span>

      <BaseGroupButton
        :button-list="currencyButtons"
        :can-deactivate="false"
        @click="onClickCurrencyButton"
      />

      <BaseSelect
        :options="selectOptions"
        class="page__sort-order"
        @change="onChangeSortOrder"
      />
    </section>

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
import BaseGroupButton from '@/components/BaseGroupButton/BaseGroupButton.vue';
import BaseSelect from '@/components/BaseSelect/BaseSelect.vue';
import { Currency, SortOrder } from '@/store/types';
import type { Option } from '@/components/BaseSelect/types';
import type { GroupButton } from '@/components/BaseGroupButton/types';

const store = useStore();

const isFilledFilter = computed(() => {
  return Object.values(store.filter).filter(item => typeof item !== 'undefined');
});
const currencyButtons = [
  {
    key: Symbol('key'),
    title: 'RUB',
    active: true,
  },
  {
    key: Symbol('key'),
    title: 'USD',
    active: false,
  },
]
const selectOptions = [
  {
    value: SortOrder.TITLE_ASC,
    label: 'Title (A to Z)',
  },
  {
    value: SortOrder.TITLE_DESC,
    label: 'Title (Z to A)',
  },
  {
    value: SortOrder.PRICE_ASC,
    label: 'Price (Lowest to Highest)',
  },
  {
    value: SortOrder.PRICE_DESC,
    label: 'Price (Highest to Lowest)',
  },
];

function onChangeSortOrder(option: Option<SortOrder>): void {
  store.updateSortOrder(option.value);
}

function onClickCurrencyButton(button: GroupButton): void {
  void store.updateCurrency(button.title as Currency);
}
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

  &__header
    display: grid
    justify-items: center
    align-items: center
    margin-bottom: 16px
    grid-template-columns: 1fr 1fr 1fr

  &__all-count
    justify-self: start

  &__sort-order
    justify-self: end
</style>
