<template>
  <main>
    <section v-if="page && page?.type === 'album'">
      <BaseContainer>
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <AlbumDetail class="mb-8" />
            <NuxtLink class="block rounded-md mr-2 inline-block dark:bg-gray-90 text-gray-20 px-4 py-2 text-sm" to="/albums">Back to albums</NuxtLink>
          </div>
          <div class="sticky top-0">
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
