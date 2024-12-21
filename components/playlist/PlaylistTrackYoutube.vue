<template>
  <div>
    <div class="h-full aspect-video grayscale hover:grayscale-0 transition-all" v-if="currentAudioId">
      <YoutubeVue3 class="aspect-video" ref="youtube" :videoid="currentAudioId"
                   @ended="ended"
                   @paused="paused"
                   @played="played"
                   :controls="1"
                   :width="640"
                   :height="360"
      />
    </div>
    <div class="relative h-2 bg-gray-100 bg-opacity-50">
      <div class="absolute top-0 left-0 h-2 bg-text" :style="progressBarStyle"></div>
      <div class="absolute top-2 flex justify-between w-full">
        <span class="text-xs p-1">{{ remainingTime }}</span>
        <span class="text-xs p-1">{{ duration }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {YoutubeVue3} from 'youtube-vue3'
import {useAudioplayer} from '~/composables/useAudioPlayer'
import type {YouTubePlayer} from "youtube-player/dist/types";

interface YoutubeVue3Ref extends YouTubePlayer {
  player: YouTubePlayer | null
}

const {
  isPlaying,
  currentAudioId,
  incrementCurrentAudioIndex,
  setCurrentAudioIdByIndex,
  setCurrentTypeByIndex,
  setCurrentCommentPathByIndex,
  setIsCommentary,
  setIsPlaying
} = useAudioplayer()
const youtube = ref<YoutubeVue3Ref | null>(null)
const duration = ref<string>()
const remainingTime = ref<string>()

const iframeSrc = computed<string>(() => {
  return `https://www.youtube.com/watch?v=${currentAudioId.value}`
})

function formatSecondsToTime(duration: number) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration - minutes * 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

function formatTimeToSeconds(time: string) {
  const [minutes, seconds] = time?.split(':')
  return Number(minutes) * 60 + Number(seconds)
}

function convertRemainingTimeToPercentage(remainingTime: string, duration: string) {
  const temp = formatTimeToSeconds(remainingTime)
  const temp2 = formatTimeToSeconds(duration)
  const temp3 = (formatTimeToSeconds(remainingTime) / formatTimeToSeconds(duration) * 100).toFixed(2)
  return temp3
}

const progressBarStyle = ref('')

function getProgressBarStyle(remainingTime: string, duration: string) {
  const string = `width: ${convertRemainingTimeToPercentage(remainingTime, duration)}%`
  progressBarStyle.value = string
  return string
}

watch(isPlaying, async (isPlaying) => {
  if (youtube.value) {
    let interval
    if (isPlaying) {
      youtube.value?.player?.playVideo()
      duration.value = formatSecondsToTime(await youtube.value?.player?.getDuration())
      interval = setInterval(async () => {
        remainingTime.value = formatSecondsToTime(await youtube.value?.player?.getCurrentTime())
        getProgressBarStyle(remainingTime.value, duration.value)
      }, 1000)
    } else {
      clearInterval(interval)
      youtube.value?.player?.pauseVideo()
    }
  }
})

function ended() {
  incrementCurrentAudioIndex()
  setCurrentAudioIdByIndex(currentAudioId.value)
  setCurrentTypeByIndex(currentAudioId.value)
  setCurrentCommentPathByIndex(currentAudioId.value)
  setIsCommentary(!!currentAudioId.value)
}

function played() {
  console.log("played")
  setIsPlaying(true)
}

function paused() {
  console.log('pause')
  setIsPlaying(false)
}
</script>

<style>
iframe {
  width: 100%;
  height: 100%;
  @apply aspect-video;
}
</style>