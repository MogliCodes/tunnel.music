<template>
  <main>
    <div v-if="page && page?.type === 'album'">
      <AlbumDetail />
    </div>
    <div v-else>
      <div v-if="page?.platform === 'youtube'">
        <client-only>
          <YoutubeWrapper
            :comments="page?.comments"
            :playlist-id="page?.playlistId"
          />
        </client-only>
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
