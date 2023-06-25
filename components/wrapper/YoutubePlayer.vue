<template>
  <div class="">
    <YouTube ref="youtube" :src="iframeSrc" @state-change="stateChange" />
  </div>
</template>

<script setup lang="ts">
import YouTube from 'vue3-youtube'

import { useAudioplayerStore } from '~/store/audioplayer'

type Props = {
  data: {}
}

const props = defineProps<Props>()
const audioPlayerStore = useAudioplayerStore()
audioPlayerStore.setPlaylistData(props.data)

const iframeSrc = computed<string>(() => {
  return `https://www.youtube.com/watch?v=${audioPlayerStore.currentAudioId}`
})

function stateChange(event: any) {
  let temp
  const playerState = event.target.getPlayerState()
  switch (playerState) {
    case -1:
      // console.log('nicht gestartet')
      break
    case 0:
      // beendet
      temp = audioPlayerStore.currentAudioIndex + 1
      audioPlayerStore.setCurrentAudioIndex(temp)
      audioPlayerStore.setCurrentAudioId(null)
      break
    case 1:
      // console.log('wiedergabe')
      break
    case 2:
      // console.log('pausiert')
      break
  }
}
</script>
