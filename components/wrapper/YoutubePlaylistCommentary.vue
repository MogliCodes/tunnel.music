<template>
  <div
    class="cursor-pointer border-b-2 border-white p-4"
    :class="{ 'bg-gray-900': props.isActive }"
    @click="playCommentary"
  >
    Kommentar #{{ playlistIndex }}
    {{ audioFile }}
  </div>
</template>

<script setup lang="ts">
import { useAudioplayerStore } from '~/store/audioplayer'

const audioPlayerStore = useAudioplayerStore()

type Props = {
  audioFile: string
  playlistIndex: number
  isActive: boolean
}

const props = defineProps<Props>()

function playCommentary() {
  audioPlayerStore.setCurrentAudioIndex(props.playlistIndex)

  const audio = new Audio(props.audioFile)

  console.log(audioPlayerStore.currentAudioIndex)
  console.log('====')
  audio.addEventListener('ended', onAudioEnded)
  audio.play()
}

function onAudioEnded() {
  console.log('ENDED')
  audioPlayerStore.incrementCurrentAudioIndex()
  audioPlayerStore.setCurrentAudioIdByIndex(audioPlayerStore.currentAudioIndex)
}
</script>
