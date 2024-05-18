<template>
  <div>
    <BaseHeadline class="capitalize mb-8" :text="genreFormatted" type="h1" />
    <div>
      <ul class="grid grid-cols-5 gap-8">
        <li v-for="item in items" :key="item._path">
          <NuxtLink :to="item._path">
            <MusicTeaser v-bind="item" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">

const route = useRoute()
const genre: string = route.path.split('/').pop() || ''
const genreFormatted = ref(genre?.replace(/-/g, ' '))

const albums = await queryContent('albums').where({ genres: { $icontains: genreFormatted.value } }).find()
const playlists = await queryContent('playlists').where({ genres: { $icontains: genreFormatted.value } }).find()

const items = [...albums, ...playlists]

</script>