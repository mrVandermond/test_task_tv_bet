<template>
  <div :class="[
    `group-button_${props.direction}_direction`,
    `group-button_${props.color}_color`,
    'group-button',
    ]">
    <BaseButton
      v-for="button in localButtonList"
      :color="props.color"
      :key="button.key"
      :group-direction="props.direction"
      :inverted="!button.active"
      class="group-button__button"
      inside-group
      @click="onClickButton(button)"
    >{{ button.title }}</BaseButton>
  </div>
</template>

<script setup lang="ts" generic="T extends { key: symbol; title: string; active: boolean }">
import BaseButton from '@/components/BaseButton.vue';
import { ref, watchEffect } from 'vue';
import type { Ref } from 'vue';

const props = withDefaults(
  defineProps<{
    buttonList: T[];
    direction?: 'horizontal' | 'vertical';
    color?: 'primary' | 'secondary';
  }>(),
  {
    direction: 'horizontal',
    color: 'primary',
  },
);
const emits = defineEmits<{
  (e: 'click', button: T): void;
}>();

const localButtonList = ref(props.buttonList) as Ref<T[]>;

watchEffect(() => {
  localButtonList.value = props.buttonList;
});

function onClickButton(button: T): void {
  localButtonList.value = localButtonList.value.map(item => ({
    ...item,
    active: item.active ? !item.active : item.key === button.key,
  }));
  emits('click', { ...button, active: !button.active });
}
</script>

<style scoped lang="sass">
.group-button
  display: flex
  overflow: hidden
  border-radius: 5px

  &__button
    flex: 1 0 0

  &.group-button_primary_color
    border: 1px solid $primary-color

  &.group-button_secondary_color
    border: 1px solid $secondary-color

  &_vertical_direction
    flex-direction: column

    & .group-button__button
      flex: initial

  &_horizontal_direction
    flex-direction: row
</style>
