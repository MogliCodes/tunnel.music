<template>
  <div>
    <div v-for="(item, index) in mergedData" :key="index">
      <div v-if="item.hasOwnProperty('kind')">
        <YoutubePlaylistTrack
          :id="item?.snippet?.resourceId.videoId"
          :key="item?.id"
          :is-active="index === audioPlayerStore?.currentAudioIndex"
          :index="index"
          :title="item?.snippet?.title"
          :thumbnail="item?.snippet?.thumbnails.default.url"
          @video-id="saveVideoId"
        />
      </div>
      <div v-else>
        <YoutubePlaylistCommentary
          :is-active="index === audioPlayerStore?.currentAudioIndex"
          :playlist-index="item?.index"
          :audio-file="item?.path"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import YoutubePlaylistTrack from '~/components/wrapper/YoutubePlaylistTrack.vue'
import { useAudioplayerStore } from '~/store/audioplayer'
import YoutubePlaylistCommentary from '~/components/wrapper/YoutubePlaylistCommentary.vue'
const audioPlayerStore = useAudioplayerStore()

type Props = {
  youtubeTracks: []
  comments: []
}

const props = defineProps<Props>()

const mergedData = ref(null)

function insertAtIndex(arr, items) {
  for (const item of items) {
    if (
      item.hasOwnProperty('index') &&
      item.index >= 0 &&
      item.index < arr.length
    ) {
      arr.splice(item.index, 0, item)
    } else {
      arr.push(item)
    }
  }

  return arr
}

function mergeData(dataYoutube, dataComments) {
  mergedData.value = [...dataYoutube]
  insertAtIndex(mergedData.value, dataComments)
}
mergeData(props.youtubeTracks, props.comments)

const videoId = ref()
const currentVideoIndex = ref(0)
audioPlayerStore.setCurrentAudioIndex(currentVideoIndex.value)

function saveVideoId(payload: { id: string; index: number }) {
  videoId.value = payload.id
  currentVideoIndex.value = payload.index
  audioPlayerStore.setCurrentAudioIndex(payload.index)
}
</script>
