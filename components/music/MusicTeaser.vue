<template>
  <article>
    <figure>
      <img class="w-full" :src="attrs?.cover" alt="" />
    </figure>
    <figcaption>
      <h2 class="mt-4">{{ attrs.title }}</h2>
    </figcaption>
  </article>
</template>

<script setup lang="ts">
const attrs = useAttrs()
</script>
