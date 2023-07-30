<template>
  <div class="pagination">
    <div>
      <BaseButton
        :disabled="isFirstPage"
        color="secondary"
        @click="goToFirst"
      >{{ '<<' }}</BaseButton>

      <BaseButton
        :disabled="isFirstPage"
        color="secondary"
        @click="goToPrev"
      >{{ '<' }}</BaseButton>
    </div>

    <div>{{ store.page }} of {{ store.countPages }}</div>

    <div>
      <BaseButton
        :disabled="isLastPage"
        color="secondary"
        @click="goToNext"
      >{{ '>' }}</BaseButton>

      <BaseButton
        :disabled="isLastPage"
        color="secondary"
        @click="goToLast"
      >{{ '>>' }}</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import useStore from '@/store';
import { computed } from 'vue';

const store = useStore();

const isFirstPage = computed(() => store.page === 1);
const isLastPage = computed(() => store.page === store.countPages);

function goToLast() {
  store.page = store.countPages;
}

function goToNext() {
  if (isLastPage.value) return;

  store.page += 1;
}

function goToPrev() {
  if (isFirstPage.value) return;

  store.page -= 1;
}

function goToFirst() {
  store.page = 1;
}
</script>

<style scoped lang="sass">
.pagination
  display: flex
  align-items: center
  justify-content: space-between
  padding: 0 12px
</style>
