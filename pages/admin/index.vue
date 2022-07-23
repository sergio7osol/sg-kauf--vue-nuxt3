<template>
  <div class="admin-page">
    <section class="new-post">
      <button>Create Post</button>
    </section>
    <section class="existing-posts">
      <h1>Existing posts</h1>
      <PostList />
    </section>
  </div>
</template>

<style scoped lang="scss">
.new-post {
  border: 1px solid yellowgreen;
}
.existing-posts {
  border: 1px solid cornflowerblue;
}
</style>
