<template>
  <div class="app">
    <Filter class="filter" />

    <Page class="page" />
  </div>
</template>

<script lang="ts" setup>
import Page from '@/components/Page.vue';
import Filter from '@/components/Filter.vue';
</script>

<style lang="sass" scoped>
.app
  display: flex
  width: 1024px
  margin: auto

.filter
  width: 250px

.page
  flex: 1 0 0
</style>

<style lang="sass">
@import "@/styles/main"
</style>
