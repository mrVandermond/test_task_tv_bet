<template>
  <select
    class="base-select"
    @change="onChange"
  >
    <option
      v-for="option in props.options"
      :key="option.label"
      :value="option.value"
      :label="option.label"
    />
  </select>
</template>

<script setup lang="ts" generic="T">
import type { Option } from '@/components/BaseSelect/types';

const props = defineProps<{
  options: Option<T>[];
}>();

const emits = defineEmits<{
  (e: 'change', option: Option<T>): void;
}>();

function onChange(event: Event) {
  const value = Number((event.target as HTMLSelectElement).value);
  const option = props.options.find(item => item.value === value);

  if (!option) return;

  emits('change', option);
}
</script>

<style scoped lang="sass">
.base-select
  font-size: 14px
  line-height: 16px
  border-radius: 5px
  padding: 4px 8px
  background-color: $gray-color
</style>
