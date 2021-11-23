<template>
  <div class="main-container">
    <ul>
      <li><NuxtLink :to="{ name: 'index' }">Home</NuxtLink></li>
      <li><NuxtLink :to="{ name: 'weather' }">Weather</NuxtLink></li>
    </ul>
    <NuxtPage />
  </div>
</template>
