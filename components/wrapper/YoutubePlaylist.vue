<template>
  <div class="mt-4 w-full rounded-2xl bg-black bg-opacity-30 p-8">
    <p class="mb-0 pb-4 text-center text-2xl font-bold">Track list</p>
    <div v-for="(item, index) in playlistData" :key="index">
      <div v-if="item.hasOwnProperty('kind')">
        <YoutubePlaylistTrack
          :id="item?.snippet?.resourceId.videoId"
          :key="item?.id"
          :is-active="index === currentAudioIndex"
          :index="index"
          :title="item?.snippet?.title"
          :thumbnail="item?.snippet?.thumbnails.default.url"
        />
      </div>
      <div v-else>
        <YoutubePlaylistCommentary
          :is-active="isActive(index)"
          :playlist-index="item?.index"
          :audio-file="item?.path"
          :text="item?.text"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import YoutubePlaylistTrack from '~/components/wrapper/YoutubePlaylistTrack.vue'
import YoutubePlaylistCommentary from '~/components/wrapper/YoutubePlaylistCommentary.vue'
import {useAudioplayer} from "~/composables/useAudioPlayer";

const { playlistData, currentAudioIndex } = useAudioplayer()

function isActive(index: number): boolean {
  return index === currentAudioIndex
}

// function saveVideoId(payload: { id: string; index: number }) {
//   audioPlayerStore.setCurrentAudioIndex(payload.index)
//   audioPlayerStore.setCurrentAudioIdByIndex(payload.index)
// }
</script>
