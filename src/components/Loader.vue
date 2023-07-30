<template>
  <div v-if="localLoading" class="loader-wrapper">
    <div class="loader" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';

const props = defineProps<{
  loading: boolean;
}>();

const timeFromLastLoading = ref(Date.now());
const localLoading = ref(false);

watchEffect(() => {
  if (props.loading) {
    timeFromLastLoading.value = Date.now();
    localLoading.value = true;

    return;
  }

  const time = Date.now() - timeFromLastLoading.value;

  if (time < 300) {
    setTimeout(() => localLoading.value = false, 300 - time);
  } else {
    localLoading.value = false;
  }
});
</script>

<style scoped lang="sass">
.loader-wrapper
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  background-color: rgba($white-color, 70%)
  display: flex
  align-items: center
  justify-content: center

.loader
  width: 48px
  height: 48px
  border: 5px solid $dark-gray-color
  border-bottom-color: transparent
  border-radius: 50%
  display: inline-block
  box-sizing: border-box
  animation: rotation 1s linear infinite

@keyframes rotation
  0%
    transform: rotate(0deg)

  100%
    transform: rotate(360deg)
</style>
