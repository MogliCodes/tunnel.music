<template>
  <main>
    <div class="flex gap-12">
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
  </main>
</template>

<script setup>
import YoutubeWrapper from '~/components/wrapper/YoutubeWrapper.vue'

const { page } = useContent()
</script>

<style>
p {
  margin-bottom: 2rem;
}
</style>
