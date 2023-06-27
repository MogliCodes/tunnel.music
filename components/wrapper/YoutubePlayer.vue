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
import YouTube from 'vue3-youtube'
import { useAudioplayerStore } from '~/store/audioplayer'

const audioPlayerStore = useAudioplayerStore()

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
