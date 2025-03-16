<template>
  <div class="flex flex-wrap gap-2">
    <div @click="selectGenre($event, genre, index)" class="cursor-pointer" v-for="(genre, index) in genres" :key="`genre-${genre}`">
      <span :class="{'bg-text dark:text-gray-90': isGenreActive(index)}" class="genre bg-gray-90 text-gray-20 text-xs p-2 rounded-md line-clamp-1 bottom-0">{{ genre }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import genres from '~/genres.json'

const emit = defineEmits(['select-genre'])
const activeGenreIndex = ref(-1)

function isGenreActive(index) {
  return index === activeGenreIndex.value
}

function selectGenre(event, genre, index) {
  if(isGenreActive(index)) {
    activeGenreIndex.value = -1
    return emit('select-genre', '*')
  } else {
    activeGenreIndex.value = index
  }
  emit('select-genre', genre)
}
</script>