<template>
    <div class="h-20 w-full bg-black bg-opacity-30">
      <div class="flex h-full items-center justify-center gap-4">
        <div
          class="playlist-control h-10 w-10 cursor-pointer rounded-full bg-gray-100"
          :class="{
          'opacity-40 pointer-events-none': currentAudioIndex === 0
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
          class="playlist-control h-16 w-16 cursor-pointer rounded-full bg-gray-100"
          @click="togglePlay"

        >
          <img
            v-if="isPlaying"
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
          class="playlist-control h-10 w-10 cursor-pointer rounded-full bg-gray-100 "
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
  import { useAudioplayer } from '~/composables/useAudioPlayer'

  const { isPlaying, currentAudioId, incrementCurrentAudioIndex, setCurrentAudioIdByIndex, setCurrentTypeByIndex, setCurrentCommentPathByIndex, setIsCommentary, setIsPlaying, decrementCurrentAudioIndex, playlistData, currentAudioIndex, currentCommentPath } = useAudioplayer()
  const emit = defineEmits(['togglePlay'])

  const playButtonPath = computed<string>(() => {
    return isPlaying.value ? '/player-control-02.svg' : '/player-control-04.svg'
  })

  const isLastSong = computed<boolean>(() => {
    return currentAudioIndex.value === playlistData.value?.length - 1
  })

  function playPrev() {
    decrementCurrentAudioIndex()
    setCurrentAudioIdByIndex(currentAudioIndex.value)
    setCurrentTypeByIndex(currentAudioIndex.value)
    setCurrentCommentPathByIndex(currentAudioIndex.value)
    setIsCommentary(!!currentCommentPath.value)
  }

  function playNext() {
    incrementCurrentAudioIndex()
    setCurrentAudioIdByIndex(currentAudioIndex.value)
    setCurrentTypeByIndex(currentAudioIndex.value)
    setCurrentCommentPathByIndex(currentAudioIndex.value)
    setIsCommentary(!!currentCommentPath.value)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying.value)
    console.log('togglePlay')
    emit('togglePlay')
  }
  </script>