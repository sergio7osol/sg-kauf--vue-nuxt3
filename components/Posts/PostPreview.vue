<template>
  <article class="post-preview">
    <div class="post-preview__thumbnail"></div>
    <div class="post-preview__content">
      <span class="post-preview__title">{{ title }}</span>
      <div v-show="text" class="post-preview__text">{{ text }}</div>
    </div>
  </article>
</template>

<script>
export default {
  name: "PostPreview",
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>
