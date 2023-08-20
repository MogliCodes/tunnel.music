<template>
  <div class="h-[360px] w-full overflow-hidden rounded-2xl bg-pink-200">
    <YouTube
      ref="youtube"
      :width="`100%`"
      class="w-full"
      :src="iframeSrc"
      @state-change="stateChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import YouTube from 'vue3-youtube'
import { useAudioplayerStore } from '~/store/audioplayer'
import {storeToRefs} from "pinia";
import {YouTubePlayer} from "youtube-player/dist/types";
const audioPlayerStore = useAudioplayerStore()
const { isPlaying, currentAudioId } = storeToRefs(audioPlayerStore)

const youtube  = ref<YouTubePlayer | null>(null)

watch(isPlaying, () => {
  if(!youtube || !youtube.value) return
  isPlaying.value ? youtube.value.playVideo() : youtube.value.pauseVideo()
})

watch(currentAudioId, () => {
  if(currentAudioId.value === undefined) {
    console.log('currently no youtube song')
    audioPlayerStore.setIsPlaying(false)
  }
})

const iframeSrc = computed<string>(() => {
  return `https://www.youtube.com/watch?v=${audioPlayerStore.currentAudioId}`
})


function stateChange(event: any) {
  let temp
  const playerState = event.target.getPlayerState()
  switch (playerState) {
    case -1:
      console.log('nicht gestartet')
      // YouTube.playVideo()
      break
    case 0:
      // beendet
      temp = audioPlayerStore.currentAudioIndex + 1
      audioPlayerStore.setCurrentAudioIndex(temp)
      audioPlayerStore.setCurrentAudioIdByIndex(temp)
      audioPlayerStore.setIsPlaying(false)
      break
    case 1:
      // console.log('wiedergabe')
        audioPlayerStore.setIsPlaying(true)
      break
    case 2:
      // console.log('pausiert')
      audioPlayerStore.setIsPlaying(false)
      break
  }
}
</script>
