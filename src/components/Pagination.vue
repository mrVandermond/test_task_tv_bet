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

    <div>{{ page }} of {{ props.countPages }}</div>

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
import { computed, onBeforeUnmount, ref, watchEffect } from 'vue';

const props = defineProps<{
  page: number;
  countPages: number;
}>();

const emits = defineEmits<{
  (e: 'update:page', page: number): void;
}>();

const page = ref(1);
const isFirstPage = computed(() => page.value === 1);
const isLastPage = computed(() => page.value === props.countPages);

const stopWatchPage = watchEffect(() => {
  if (props.page === page.value) return;

  page.value = props.page;
});

function updatePage(newPage: number) {
  page.value = newPage;
  emits('update:page', newPage);
}

function goToLast() {
  updatePage(props.countPages);
}

function goToNext() {
  if (isLastPage.value) return;

  updatePage(page.value + 1);
}

function goToPrev() {
  if (isFirstPage.value) return;

  updatePage(page.value - 1);
}

function goToFirst() {
  updatePage(1);
}

onBeforeUnmount(() => {
  stopWatchPage();
});
</script>

<style scoped lang="sass">
.pagination
  display: flex
  align-items: center
  justify-content: space-between
  padding: 0 12px
</style>
