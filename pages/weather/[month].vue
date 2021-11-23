<template>
  <h1>Weather Month is: {{ $route.params.month }}</h1>
</template>

<script setup>
  const route = useRoute();
  console.log('Month: ', route.params.month);
</script>
