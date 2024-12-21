<template>
  <main>
    <section v-if="page && page?.type === 'album'">
      <BaseContainer>
        <div class="flex flex-col md:flex-row justify-between gap-8">
          <div class="md:w-2/6">
            <div class="flex flex-wrap gap-2">
              <div class="bg-gray-90 text-gray-20 text-xs p-2 rounded-md line-clamp-1 bottom-0" v-for="genre in page.genres">{{genre }}</div>
            </div>
            <AlbumDetail class="mb-8" />
            <NuxtLink class="rounded-md mr-2 inline-block dark:bg-gray-90 text-gray-20 px-4 py-2 text-sm" to="/albums">Back to albums</NuxtLink>
          </div>
          <div class="md:w-7/12 sticky top-0">
            <youtube-embed :url="youtubeUrl"></youtube-embed>
            <br>
            <spotify-embed v-if="page.spotifyId" :url="spotifyUrl"></spotify-embed>
          </div>
        </div>
      </BaseContainer>
    </section>
  </main>
</template>

<script setup>
import AlbumDetail from '~/components/templates/AlbumDetail.vue'
const { page } = useContent()

const youtubeUrl = computed(() => `https://www.youtube.com/embed/videoseries?list=${page?.value.youtubeId}`)
const spotifyUrl = computed(() => `https://open.spotify.com/embed/album/${page?.value.spotifyId}utm_source=generator`)

</script>

<style scoped>
p {
  margin-bottom: 2rem;
}
</style>
