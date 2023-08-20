<template>
    <div v-if="audioPlayerStore.currentAudioId">
        <span>YouTube</span>
        <YouTube
            v-if="iframeSrc"
            ref="youtube"
            :width="`100%`"
            class="w-full"
            :src="iframeSrc"
            @state-change="stateChange"
            />
    </div>
</template>

<script setup lang="ts">
import YouTube from 'vue3-youtube'
import {useAudioplayerStore} from '~/store/audioplayer'
import {YouTubePlayer} from "youtube-player/dist/types";
import {storeToRefs} from "pinia";

const audioPlayerStore = useAudioplayerStore()
const { isPlaying, currentAudioId } = storeToRefs(audioPlayerStore)
const youtube  = ref<YouTubePlayer | null>(null) 

const iframeSrc = computed<string>(() => {
  return `https://www.youtube.com/watch?v=${audioPlayerStore.currentAudioId}`
})

onMounted(() => {
    if(!youtube || !youtube.value) return
    if(isPlaying.value) {
        youtube.value.playVideo() 
    } else {
        youtube.value.pauseVideo()
        console.log("SHOULD PAUSE")
    }
})

watch(isPlaying, () => {
    console.log('isplaying', isPlaying)
    if(!youtube || !youtube.value) return
    if(isPlaying.value) {
        youtube.value.playVideo() 
    } else {
        youtube.value.pauseVideo()
        console.log("SHOULD PAUSE")
    }
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
        audioPlayerStore.incrementCurrentAudioIndex()
        audioPlayerStore.setCurrentAudioIdByIndex(audioPlayerStore.currentAudioIndex)
        audioPlayerStore.setCurrentTypeByIndex(audioPlayerStore.currentAudioIndex)
        audioPlayerStore.setCurrentCommentPathByIndex(audioPlayerStore.currentAudioIndex)
        audioPlayerStore.setIsCommentary(!!audioPlayerStore.currentCommentPath)
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
