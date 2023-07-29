<template>
  <button
    :disabled="props.disabled"
    :class="[
      `base-button_${props.color}_color`,
      props.disabled ? 'base-button_disabled' : '',
      'base-button'
    ]"
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

  & + &
    margin-left: 8px


  &.base-button_primary_color
    background-color: $primary-color

    &.base-button_disabled
      background-color: lighten($primary-color, 15%)
      cursor: not-allowed

  &.base-button_secondary_color
    background-color: $secondary-color

    &.base-button_disabled
      background-color: lighten($secondary-color, 15%)
      cursor: not-allowed
</style>
