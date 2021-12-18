<template>
  <h1>Weather Month is: {{ $route.params.month }}</h1>
</template>

<script lang="ts">
  const route = useRoute();
  console.log('Month: ', route.params.month);

  export default {
    validate(data) {
      const month = 'January' || 'February' || 'March';
      const isValid = data.params.month === month;
      console.log('_month page - data: ', month);
      return isValid;
    }
  };
</script>
