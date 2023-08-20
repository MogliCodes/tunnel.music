<template>
    <div class="h-20 w-full bg-black bg-opacity-30">
      <div class="flex h-full items-center justify-center gap-4">
        <div
          class="playlist-control h-10 w-10 cursor-pointer rounded-full bg-black"
          :class="{
          'opacity-40 pointer-events-none': audioPlayerStore.currentAudioIndex === 0
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
            v-if="audioPlayerStore.isPlaying"
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
  import { useAudioplayerStore } from '~/store/audioplayer'
  
  const audioPlayerStore = useAudioplayerStore()
  const emit = defineEmits(['togglePlay'])
  
  const playButtonPath = computed<string>(() => {
    return audioPlayerStore.isPlaying.value ? '/player-control-02.svg' : '/player-control-04.svg'
  })
  
  const isLastSong = computed<boolean>(() => {
    return audioPlayerStore.currentAudioIndex === audioPlayerStore.playlistData?.length - 1
  })
  
  function playPrev() {
    audioPlayerStore.decrementCurrentAudioIndex()
    audioPlayerStore.setCurrentAudioIdByIndex(audioPlayerStore.currentAudioIndex)
    audioPlayerStore.setCurrentTypeByIndex(audioPlayerStore.currentAudioIndex)
    audioPlayerStore.setCurrentCommentPathByIndex(audioPlayerStore.currentAudioIndex)
    audioPlayerStore.setIsCommentary(!!audioPlayerStore.currentCommentPath)

  }
  
  function playNext() {
    audioPlayerStore.incrementCurrentAudioIndex()
    audioPlayerStore.setCurrentAudioIdByIndex(audioPlayerStore.currentAudioIndex)
    audioPlayerStore.setCurrentTypeByIndex(audioPlayerStore.currentAudioIndex)
    audioPlayerStore.setCurrentCommentPathByIndex(audioPlayerStore.currentAudioIndex)
    audioPlayerStore.setIsCommentary(!!audioPlayerStore.currentCommentPath)
  }
  
  function togglePlay() {
    audioPlayerStore.setIsPlaying(!audioPlayerStore.isPlaying)
    console.log('togglePlay')
    emit('togglePlay')
  }
  </script>
  