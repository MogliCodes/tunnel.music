<template>
  <main>
    <div v-if="page.type === 'album'">
      <AlbumDetail />
    </div>
    <div v-else>
      <div class="flex gap-12">
        <div class="w-1/2">
          <pre> {{ page }}</pre>
        </div>
        <div v-if="page.platform === 'youtube'" class="w-1/2">
          <div class="">
            <client-only>
              <YoutubeWrapper
                :comments="page.comments"
                :playlist-id="page.playlistId"
              />
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import YoutubeWrapper from '~/components/wrapper/YoutubeWrapper.vue'
import AlbumDetail from '~/components/templates/AlbumDetail.vue'

const { page } = useContent()
</script>

<style>
p {
  margin-bottom: 2rem;
}
</style>
