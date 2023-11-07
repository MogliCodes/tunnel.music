<template>
  <article class="rounded-md overflow-hidden">
    <figure>
      <img class="aspect-square w-full grayscale brightness-50 hover:brightness-100 hover:grayscale-0 transition duration-1000" :src="attrs?.cover" alt="" />
    </figure>
    <figcaption class="p-4 bg-gray-90">
      <h2 class="mt-2 text-gray-20">{{ attrs.title }}</h2>
    </figcaption>
  </article>
</template>

<script setup lang="ts">
const attrs = useAttrs()
</script>
