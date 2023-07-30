<template>
  <div class="app">
    <Filter class="filter" />

    <Page class="page" />

    <Loader :loading="store.loading" />
  </div>
</template>

<script lang="ts" setup>
import Page from '@/components/Page.vue';
import Filter from '@/components/Filter.vue';
import Loader from '@/components/Loader.vue';
import useStore from '@/store';

const store = useStore();
</script>

<style lang="sass" scoped>
.app
  display: flex
  width: 1024px
  margin: auto
  padding: 24px 0

.filter
  width: 250px
  margin-right: 16px

.page
  flex: 1 0 0
</style>

<style lang="sass">
@import "@/styles/main"
</style>
