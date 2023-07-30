<template>
  <article class="card">
    <section class="card__header">
      <h3 class="card__subhead">{{ props.card.name }}</h3>
      <div>Art: {{ props.card.art }}</div>
    </section>

    <section class="card__content">
      <div>Price: {{ props.card.convertedPrice }} {{ currentCurrencySymbol }}</div>
      <div>Year: {{ props.card.year }}</div>
      <div>Stock: {{ stockCount }}</div>
    </section>

    <section class="card__footer">
      <BaseButton :disabled="stockCount === 0" @click="onClickAddToCard">Add to card</BaseButton>
    </section>
  </article>
</template>

<script setup lang="ts">
import type { ExtendedCatalogItem } from '@/store/types'
import { Currency, Stock } from '@/store/types'
import BaseButton from '@/components/BaseButton.vue'
import { computed } from 'vue'
import useStore from '@/store'

const props = defineProps<{
  card: ExtendedCatalogItem
}>()
const store = useStore()

const stockCount = computed(() => {
  return props.card.stockCount.value[Stock.STOCK_1] + props.card.stockCount.value[Stock.STOCK_2]
});
const currentCurrencySymbol = computed(() => {
  if (store.currentCurrency === Currency.RUB) return '₽';
  if (store.currentCurrency === Currency.USD) return '$';

  return '';
});

function onClickAddToCard() {
  if (stockCount.value === 0) return

  store.addToCard(props.card.art)
}
</script>

<style scoped lang="sass">
.card
  border: 1px solid $dark-gray-color
  border-radius: 8px
  overflow: hidden

.card__header,
.card__footer
  background-color: $gray-color

.card__header,
.card__footer
  padding: 8px 12px

.card__content
  border-top: 1px solid $dark-gray-color
  border-bottom: 1px solid $dark-gray-color
  display: flex
  justify-content: space-between
  padding: 16px 12px

.card__subhead
  margin-bottom: 8px
</style>
