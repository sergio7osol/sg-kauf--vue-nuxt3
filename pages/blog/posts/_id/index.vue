<template>
    <article class="post">
      <h1 class="post__title">Post ID: {{ $route.params.id }}</h1>
      <div class="post__content">
        <p class="post__description">Some post description</p>
        <div class="post__details">
          <p class="post__date">Last updated on XXX</p>
          <p class="post__author">Written by NAME</p>
        </div>
      </div>
      <div class="post__feedback">
        Let me know what you think about the post. Send me an: <a href="mailto: sergey8osokin@gmail.com">Email</a>
      </div>
    </article>
</template>

<script>
export default {
  name: "blog-post-page"
}
</script>

<style scoped>

</style>
