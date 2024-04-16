<template>
  <div class="mb-4 flex gap-2">
    <div v-for="(genre, index) in genres" :key="`genre-${index}`">
      <span class="block rounded-md text-xs bg-gray-90 px-2 py-1 text-gray-20">{{
        genre
      }}</span>
    </div>
  </div>
</template>

<script setup>
const attrs = useAttrs()
const genres = computed(() => {
  return []
})
</script>
