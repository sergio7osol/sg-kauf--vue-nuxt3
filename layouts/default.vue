<template>
  <div class="main-container">
    <MainHeader />
    <ul>
      <li><NuxtLink :to="{ name: 'index' }">Home</NuxtLink></li>
      <li><NuxtLink :to="{ name: 'weather' }">Weather</NuxtLink></li>
    </ul>
  </div>
  <slot />
</template>
<script>
import MainHeader from "../components/MainHeader";
export default {
  components: {MainHeader}
}
</script>
