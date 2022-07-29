<script setup lang="ts">
  import type SortOrder from '~~/types/SortOrder';

  const { activeSortOrder } = defineProps<{
    activeSortOrder: SortOrder
  }>();
  const emit = defineEmits<{
    (e: '@sort-order', direction: SortOrder): void;
  }>();
</script>

<template>
  <div class="sort-box">
    <button
        class="btn btn-secondary sort-box__ctrl"
        :class="{ 'sort-box__ctrl--active': activeSortOrder === 'ascend' }"
        @click="emit('@sort-order', 'ascend')"
    >
      &uarr;
    </button>
    <button
        class="btn btn-secondary sort-box__ctrl"
        :class="{ 'sort-box__ctrl--active': activeSortOrder === 'descend' }"
        @click="emit('@sort-order', 'descend')"
    >
      &darr;
    </button>
  </div>
</template>

<style scoped lang="scss">
@use 'assets/styles/variables';

.sort-box {
  display: flex;
  justify-content: center;
  padding: .5rem 1rem;
  &__ctrl {
    border: .1rem solid variables.$default-outline-color;
    line-height: 1;
    &:last-child {
      margin-left: .5rem;
    }
    &--active {
      color: #fff;
      border-color: variables.$default-menu-btn-bg-color;
      background-color: variables.$default-menu-btn-bg-color;
      cursor: default !important;
    }
  }
}
</style>
