<template>
  <MainHeader />
  <ul>
    <li>
      <nuxt-link :to="{ name: 'weather-month', params: { month: 'January' } }">January</nuxt-link>
    </li>
    <li>
      <nuxt-link :to="{ name: 'weather-month', params: { month: 'February' } }">February</nuxt-link>
    </li>
    <li>
      <nuxt-link :to="{ name: 'weather-month', params: { month: 'March' } }">March</nuxt-link>
    </li>
  </ul>
  <slot />
</template>
