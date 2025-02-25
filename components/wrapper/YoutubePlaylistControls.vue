<template>
  <div class="mt-4 h-20 w-full rounded-xl bg-black bg-opacity-30">
    <div class="flex h-full items-center justify-center gap-4">
      <button class="playlist-control h-10 w-10 cursor-pointer rounded-full bg-black"
        :class="{ 'opacity-40 pointer-events-none': isFirstTrack }" @click="playPrev">
        <img class="relative h-full w-full p-3.5" src="/player-control-01.svg" alt="Previous track" />
      </button>
      <button class="playlist-control h-16 w-16 cursor-pointer rounded-full bg-black" @click="togglePlay">
        <img :class="{ '-right-1': !isPlaying }" class="relative h-full w-full p-4" :src="playButtonIcon"
          :alt="isPlaying ? 'Pause' : 'Play'" />
      </button>
      <button class="playlist-control h-10 w-10 cursor-pointer rounded-full bg-black" @click="playNext"
        :class="{ 'opacity-40 pointer-events-none': isLastTrack }">
        <img class="relative h-full w-full p-3.5" src="/player-control-03.svg" alt="Next track" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useYoutube } from "~/composables/useYoutube";

const {
  isPlaying,
  currentAudioIndex,
  playlistData,
  decrementCurrentAudioIndex,
  incrementCurrentAudioIndex,
  setCurrentAudioIdByIndex,
  setIsPlaying,
  setCurrentType,
  setIsCommentary,
  setCurrentCommentPath
} = useYoutube()

const isFirstTrack = computed(() => currentAudioIndex.value === 0)

const isLastTrack = computed(() => {
  if (!playlistData.value) return true
  return currentAudioIndex.value === playlistData.value.length - 1
})

const playButtonIcon = computed(() =>
  isPlaying.value ? '/player-control-04.svg' : '/player-control-02.svg'
)

function playPrev() {
  decrementCurrentAudioIndex()
  const currentTrack = playlistData.value?.[currentAudioIndex.value]

  if (currentTrack) {
    if (currentTrack.type === 'PlaylistYoutubeTrack') {
      setCurrentType('PlaylistYoutubeTrack')
      setIsCommentary(false)
      setCurrentAudioIdByIndex(currentAudioIndex.value)
      setIsPlaying(true)
    } else if (currentTrack.type === 'PlaylistComment') {
      setCurrentType('PlaylistComment')
      setIsCommentary(true)
      setCurrentCommentPath(currentTrack.path)
      setCurrentAudioIdByIndex(currentAudioIndex.value)
    }
  }
}

function playNext() {
  incrementCurrentAudioIndex()
  const currentTrack = playlistData.value?.[currentAudioIndex.value]

  if (currentTrack) {
    if (currentTrack.type === 'PlaylistYoutubeTrack') {
      setCurrentType('PlaylistYoutubeTrack')
      setIsCommentary(false)
      setCurrentAudioIdByIndex(currentAudioIndex.value)
      setIsPlaying(true)
    } else if (currentTrack.type === 'PlaylistComment') {
      setCurrentType('PlaylistComment')
      setIsCommentary(true)
      setCurrentCommentPath(currentTrack.path)
      setCurrentAudioIdByIndex(currentAudioIndex.value)
    }
  }
}

function togglePlay() {
  setIsPlaying(!isPlaying.value)
}
</script>