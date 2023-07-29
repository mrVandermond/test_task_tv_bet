<template>
  <article class="card">
    <div class="card__header">
      <h3 class="card__subhead">{{ props.card.name }}</h3>
      <div>Art: {{ props.card.art }}</div>
    </div>

    <div class="card__content">
      <div>Price: {{ props.card.price }}</div>
      <div>Year: {{ props.card.year }}</div>
      <div>Stock: {{ props.card.stockCount }}</div>
    </div>

    <div class="card__footer">
      <BaseButton
        :disabled="props.card.stockCount.value === 0"
        @click="onClickAddToCard"
      >Add to card</BaseButton>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ExtendedCatalogItem } from '@/store/types';
import BaseButton from '@/components/BaseButton.vue';

const props = defineProps<{
  card: ExtendedCatalogItem;
}>();

function onClickAddToCard() {
  if (props.card.stockCount.value === 0) return;

  props.card.stockCount.value -= 1;
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
