<template>
  <h1>List of posts</h1>
  <section class="featured-posts">
    <ul class="featured-posts__list">
      <li class="featured-posts__item" v-for="id of ids" :key="id">
        <nuxt-link :to="{ name: 'blog-posts-id', params: { id } }">
          <PostPreview :title="'Some title' + id" />
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import PostPreview from "~/components/Posts/PostPreview.vue";

export default {
  name: 'layout-blog',
  components: { PostPreview  },
  data() {
    return {
      ids: [1, 2, 3, 4]
    }
  }
};
</script>
