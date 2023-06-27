<template>
  <div class="mt-4 h-20 w-full rounded-xl bg-black bg-opacity-30">
    <div class="flex h-full items-center justify-center gap-4">
      <div
        class="playlist-control h-10 w-10 cursor-pointer rounded-full bg-black"
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
          class="relative -right-1 h-full w-full p-4"
          src="/player-control-02.svg"
          alt=""
        />
      </div>
      <div
        class="playlist-control h-10 w-10 cursor-pointer rounded-full bg-black"
        @click="playNext"
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
import { useAudioplayerStore } from '~/store/audioplayer'

const audioPlayerStore = useAudioplayerStore()
function playPrev() {
  audioPlayerStore.decrementCurrentAudioIndex()
  audioPlayerStore.setCurrentAudioIdByIndex(audioPlayerStore.currentAudioIndex)
  console.log('playPrev')
}

function playNext() {
  audioPlayerStore.incrementCurrentAudioIndex()
  audioPlayerStore.setCurrentAudioIdByIndex(audioPlayerStore.currentAudioIndex)
  console.log('playNext')
}

function togglePlay() {
  console.log('togglePlay')
}
</script>
