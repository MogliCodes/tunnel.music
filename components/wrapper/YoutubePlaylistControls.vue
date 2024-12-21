<template>
  <div class="mt-4 h-20 w-full rounded-xl bg-black bg-opacity-30">
    <div class="flex h-full items-center justify-center gap-4">
      <div
          class="playlist-control h-10 w-10 cursor-pointer rounded-full bg-black"
          :class="{
        'opacity-40 pointer-events-none': currentAudioIndex.value === 0
        }"
          @click="playPrev()"
      >
        <img
            class="relative h-full w-full p-3.5"
            src="/player-control-01.svg"
            alt=""
        />
      </div>
      <div
          class="playlist-control h-16 w-16 cursor-pointer rounded-full bg-black"
          @click="togglePlay"

      >
        <img
            v-if="isPlaying.value"
            class="relative h-full w-full p-4"
            src="/player-control-04.svg"
            alt=""
        />
        <img
            v-else
            class="relative -right-1  h-full w-full p-4"
            src="/player-control-02.svg"
            alt=""
        />
      </div>
      <div
          class="playlist-control h-10 w-10 cursor-pointer rounded-full bg-black "
          @click="playNext"
          :class="{
        'opacity-40 pointer-events-none': isLastSong
        }"
      >
        <img
            class="relative h-full w-full p-3.5"
            src="/player-control-03.svg"
            alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAudioplayer} from "~/composables/useAudioPlayer";

const {
  isPlaying,
  currentAudioIndex,
  playlistData,
  decrementCurrentAudioIndex,
  incrementCurrentAudioIndex,
  setCurrentAudioIdByIndex,
  setIsPlaying
} = useAudioplayer()

const emit = defineEmits(['togglePlay'])

const playButtonPath = computed<string>(() => {
  return isPlaying.value ? '/player-control-02.svg' : '/player-control-04.svg'
})

const isLastSong = computed<boolean>(() => {
  if (playlistData.value && currentAudioIndex.value !== undefined) {
    return currentAudioIndex.value === playlistData.value.length - 1
  }
  return false
})

function playPrev() {
  decrementCurrentAudioIndex()
  setCurrentAudioIdByIndex(currentAudioIndex.value ?? 0)
  console.log('playPrev')
}

function playNext() {
  const temp = (currentAudioIndex.value ?? 0) + 1

  incrementCurrentAudioIndex()
  setCurrentAudioIdByIndex(temp)
  setIsPlaying(true)
  console.log('playNext')
}

function togglePlay() {
  setIsPlaying(!isPlaying.value)
  console.log('togglePlay')
  emit('togglePlay')
}
</script>