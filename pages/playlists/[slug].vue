<template>
  <main>
    <div class="flex gap-24">
      <div class="w-1/2">
        <ContentDoc />
      </div>
      <div class="w-1/2">
        <client-only>
          <YoutubeWrapper
            :comments="page?.comments || []"
            :playlist-id="page?.playlistId"
          />
        </client-only>
      </div>
    </div>
  </main>
</template>

<script setup>
import YoutubeWrapper from '~/components/wrapper/YoutubeWrapper.vue'
import {useAudioplayerStore} from "~/store/audioplayer";
const audioStore = useAudioplayerStore()

const { page } = useContent()
audioStore.clearPlaylistData()
</script>

<style>
p {
  margin-bottom: 2rem;
}
</style>
