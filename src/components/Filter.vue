<template>
  <aside class="filter">
    <section class="filter__header">
      <span>Filters</span>

      <span
        class="filter__clear-plain-button"
        @click="onClickClearFilter"
      >Clear</span>
    </section>

    <section class="filter__block">
      <BaseGroupButton
        :button-list="brands"
        direction="vertical"
        class="filter__group-button"
        @click="onClickBrand"
      />
    </section>

    <section class="filter__block">
      <BaseGroupButton
        :button-list="yearsOfIssue"
        direction="vertical"
        class="filter__group-button"
        @click="onClickYear"
      />
    </section>

    <section class="filter__block">
      <BaseGroupButton
        :button-list="stocks"
        @click="onClickStock"
      />
    </section>
  </aside>
</template>

<script setup lang="ts">
import useStore from '@/store';
import BaseGroupButton from '@/components/BaseGroupButton.vue';
import type { BrandItem } from '@/store/types';
import { ref } from 'vue';
import { Stock } from '@/store/types';

interface GroupButton {
  active: boolean;
  title: string;
  key: symbol;
}

type BrandButton = GroupButton & BrandItem;
type YearButton = GroupButton & { year: number };
type StockButton = GroupButton & { id: Stock };

const store = useStore();
const brands = ref(store.brands.map(item => ({
  ...item,
  title: item.name,
  key: Symbol('key'),
  active: false,
})));
const yearsOfIssue = ref(store.yearsOfIssue.map(item => ({
  year: item,
  title: item.toString(),
  key: Symbol('key'),
  active: false,
})));
const stocks = ref(Object.values(Stock).map((item, index) => ({
  id: item,
  title: `Store ${index + 1}`,
  key: Symbol('key'),
  active: false,
})));

function onClickClearFilter() {
  store.updateFilter({
    yearOfIssue: undefined,
    stock: undefined,
    brand: undefined,
  });
  brands.value = brands.value.map(item => ({ ...item, active: false }));
  yearsOfIssue.value = yearsOfIssue.value.map(item => ({ ...item, active: false }));
  stocks.value = stocks.value.map(item => ({ ...item, active: false }));
}

function onClickBrand(button: BrandButton): void {
  store.updateFilter({
    ...store.filter,
    brand: button.active ? button.id : undefined,
  });
}

function onClickYear(button: YearButton): void {
  store.updateFilter({
    ...store.filter,
    yearOfIssue: button.active ? button.year : undefined,
  });
}

function onClickStock(button: StockButton): void {
  store.updateFilter({
    ...store.filter,
    stock: button.active ? button.id : undefined,
  });
}
</script>

<style scoped lang="sass">
.filter__header
  display: flex
  justify-content: space-between
  margin-bottom: 16px

.filter__clear-plain-button
  color: $primary-color
  text-decoration: underline
  cursor: pointer

.filter__block
  padding: 8px 0
  border-bottom: 1px solid $dark-gray-color

.filter__group-button
  width: 90px
</style>
