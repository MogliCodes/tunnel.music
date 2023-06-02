<template>
  <div class="mb-4 flex gap-2">
    <div v-for="(genre, index) in genres" :key="`genre-${index}`">
      <span class="block bg-infoForeground px-2 py-1 text-infoForeground">{{
        genre
      }}</span>
    </div>
  </div>
</template>

<script setup>
const attrs = useAttrs()
const genres = computed(() => {
  return attrs.genres.split(',')
})
</script>
