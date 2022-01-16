<template>
  <div class="error-page">
    <h1>404</h1>
    <h2>Oops, something went wrong!</h2>
    <p>
      Back to
      <a class="error__link" href="/">safety</a>!
      <a class="error__link" href="/">
        <img src="/assets/images/shopping-basket.jpg" alt="shopping basket"/>
      </a>
    </p>
  </div>
</template>

<style scoped lang="scss">
.error {
  &-page {
    text-align: center;
  }
  &__link {
    text-decoration: none;
    color: red;
    &:hover, &:active {
      color: salmon;
    }
  }
}
</style>
