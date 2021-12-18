<template>
  <header class="main-header"> <!-- navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow -->
    <NuxtLink to="/" class="navbar-brand col-md-3 col-lg-2 me-0 px-3">
      <svg class="vue-logo" version="1.1" viewBox="0 0 261.76 226.69" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1.3333 0 0 -1.3333 -76.311 313.34)"><g transform="translate(178.06 235.01)"><path d="m0 0-22.669-39.264-22.669 39.264h-75.491l98.16-170.02 98.16 170.02z" fill="#41b883"/></g><g transform="translate(178.06 235.01)"><path d="m0 0-22.669-39.264-22.669 39.264h-36.227l58.896-102.01 58.896 102.01z" fill="#34495e"/></g></g></svg>
      SG Kauf
    </NuxtLink>
    <nav class="navbar navbar-expand-lg">
      <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#topMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="topMenu" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 px-3">
          <li class="nav-item">
            <NuxtLink class="nav-link" :to="{ name: 'index' }">Home</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" :to="{ name: 'weather' }">Weather</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" :to="{ name: 'weather-_month' }">Month</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" :to="{ name: 'weather-_month', params: { month: 'January' } }">January</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" :to="{ name: 'weather-_month', params: { month: 'February' } }">February</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" :to="{ name: 'weather-_month', params: { month: 'March' } }">March</NuxtLink>
          </li>
          <li class="nav-item text-nowrap">
            <NuxtLink class="dropdown-item" :to="{ name: 'blog-posts-_id', params: { id: 1 } }">Post 1</NuxtLink>
          </li>
          <li class="nav-item text-nowrap"><a class="dropdown-item" href="#">Post 2</a></li>
          <li class="nav-item text-nowrap"><hr class="dropdown-divider"></li>
          <li class="nav-item text-nowrap"><a class="dropdown-item" href="#">Post 3</a></li>
          <li class="nav-item">
            <form class="d-flex">
              <input class="form-control form-control-dark w-100 me-2" placeholder="Search" aria-label="Search" type="text">
              <button class="btn btn-secondary" type="submit">Search</button>
            </form>
          </li>
        </ul>
      </div>
      <span class="nav-item text-nowrap">
        <a class="nav-link" href="#">Sign out</a>
      </span>
    </nav>
  </header>
</template>

<script lang="ts">
export default {
  name: 'MainHeader'
}
</script>

<style scoped lang="scss">
@use 'assets/styles/variables' as *;

.vue-logo {
  width: 2rem;
}
.main-header {
  padding: 0;
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
  background-color: #343a40 !important;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  z-index: 3;
  .navbar-brand, .nav-link {
    color: #fff;
  }
}
</style>
