<template>
  <button
    :disabled="props.disabled"
    :class="[`base-button_${props.color}_color`, 'base-button']"
    @click="emits('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: 'primary' | 'secondary';
    disabled?: boolean;
  }>(),
  {
    color: 'primary',
    disabled: false,
  }
);

const emits = defineEmits<{
  (e: 'click'): void;
}>();
</script>

<style scoped lang="sass">
.base-button
  display: inline-block
  outline: none
  padding: 8px
  border: none
  border-radius: 5px
  color: $white-color
  cursor: pointer

  &.base-button_primary_color
    background-color: $primary-color

  &.base-button_secondary_color
    background-color: $secondary-color
</style>
