<template>
  <div
    class="cursor-pointer border-t-2 border-white p-4"
    :class="{ 'bg-gray-600 font-bold': props.isActive }"
    @click="playCommentary"
  >
    Kommentar #{{ playlistIndex }}
    {{ audioFile }}
  </div>
</template>

<script setup lang="ts">
import { useAudioplayerStore } from '~/store/audioplayer'
import {storeToRefs} from "pinia";
const audioPlayerStore = useAudioplayerStore()
const { isPlaying } = storeToRefs(audioPlayerStore)


type Props = {
  audioFile: string
  playlistIndex: number
  isActive: boolean
}

const props = defineProps<Props>()

const shouldPlay = computed(() => {
  return props.isActive
})

watch(shouldPlay, () => {
  playCommentary()
})

// watch(isPlaying, () => {
//   onAudioEnded()
// })

let audio: HTMLAudioElement | null
audio = new Audio(props.audioFile)

function playCommentary() {
  if (!audio) return
  audioPlayerStore.setCurrentAudioIndex(props.playlistIndex)
  audio.play()
  audio.addEventListener('ended', onAudioEnded)
}

function onAudioEnded() {
  console.log('ENDED')
  audio = null
  audioPlayerStore.incrementCurrentAudioIndex()
  audioPlayerStore.setCurrentAudioIdByIndex(audioPlayerStore.currentAudioIndex)
}
</script>
