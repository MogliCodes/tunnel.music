<template>
  <div class="flex flex-wrap gap-2">
    <div @click="selectGenre($event, genre)" class="cursor-pointer" v-for="(genre) in genres" :key="`genre-${genre}`">
      <span class="genre bg-gray-90 text-gray-20 text-xs p-2 rounded-md line-clamp-1 bottom-0">{{ genre }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import genres from '~/genres.json'

const emit = defineEmits(['select-genre'])

function selectGenre(event, genre) {
  document.querySelectorAll('.genre').forEach((el) => {
    el.classList.remove('bg-text')
    el.classList.remove('dark:text-gray-90')
  })
  if(event.target.classList.contains('bg-text')) {
    event.target.classList.remove('bg-text')
    event.target.classList.remove('dark:text-gray-90')
  } else {
    event.target.classList.add('bg-text')
    event.target.classList.add('dark:text-gray-90')
  }
  emit('select-genre', genre)
}
</script>