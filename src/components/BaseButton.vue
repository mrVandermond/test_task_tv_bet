<template>
  <button
    :disabled="props.disabled"
    :class="[
      `base-button_${props.color}_color`,
      props.disabled ? 'base-button_disabled' : '',
      props.inverted ? 'base-button_inverted' : '',
      props.insideGroup ? 'base-button_group-member' : '',
      `base-button_${props.groupDirection}_direction`,
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
    inverted?: boolean;
    insideGroup?: boolean;
    groupDirection?: 'horizontal' | 'vertical'
  }>(),
  {
    color: 'primary',
    disabled: false,
    inverted: false,
    insideGroup: false,
    groupDirection: 'horizontal',
  },
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
  border: 1px solid transparent
  border-radius: 5px
  color: $white-color
  cursor: pointer

  &:not(.base-button_group-member) + &:not(.base-button_group-member)
    margin-left: 8px


  &_primary_color
    background-color: $primary-color

    &.base-button_inverted
      color: $primary-color
      background-color: $white-color
      border: 1px solid $primary-color

    &.base-button_disabled
      background-color: lighten($primary-color, 15%)
      cursor: not-allowed

  &_secondary_color
    background-color: $secondary-color

    &.base-button_inverted
      color: $secondary-color
      background-color: $white-color
      border: 1px solid $secondary-color

    &.base-button_disabled
      background-color: lighten($secondary-color, 15%)
      cursor: not-allowed

  &_group-member
    border-radius: 0

    &.base-button_primary_color.base-button_inverted.base-button_horizontal_direction,
    &.base-button_secondary_color.base-button_inverted.base-button_horizontal_direction
      border: 1px solid transparent
      border-left-color: currentColor

    &.base-button_primary_color.base-button_inverted.base-button_horizontal_direction:first-of-type,
    &.base-button_secondary_color.base-button_inverted.base-button_horizontal_direction:first-of-type
      border-left-color: transparent

    &.base-button_primary_color.base-button_inverted.base-button_vertical_direction,
    &.base-button_secondary_color.base-button_inverted.base-button_vertical_direction
      border: 1px solid transparent
      border-top-color: currentColor

    &.base-button_primary_color.base-button_inverted.base-button_vertical_direction:first-of-type,
    &.base-button_secondary_color.base-button_inverted.base-button_vertical_direction:first-of-type
      border-top-color: transparent
</style>
