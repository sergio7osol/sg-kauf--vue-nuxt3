<template>
  <h1>Weather Month is: {{ $route.params.month }}</h1>
</template>

<script setup>
  const route = useRoute();
  console.log('Month: ', route.params.month);
</script>

<script lang="ts">
  export default defineComponent({
    validate(data) {
      const month = 'January' || 'February' || 'March';
      const isValid = data.params.month === month;
      console.log('month page - data: ', month);
      return isValid;
    }
  });
</script>
