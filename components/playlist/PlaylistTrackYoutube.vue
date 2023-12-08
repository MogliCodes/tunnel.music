<template>
    <div>
      <div class="h-full aspect-video" v-if="audioPlayerStore.currentAudioId">
        <YoutubeVue3 ref="youtube" :videoid="audioPlayerStore.currentAudioId"
                     @ended="ended"
                     @paused="paused"
                     @played="played"
                     :controls="0"
        />


      </div>
      <div>
        {{ remainingTime }} /
        {{ duration }}
      </div>
      <div class="h-2 bg-text" :style="progressBarStyle"></div>
    </div>
</template>

<script setup lang="ts">
import { YoutubeVue3 } from 'youtube-vue3'

import {useAudioplayerStore} from '~/store/audioplayer'
import {YouTubePlayer} from "youtube-player/dist/types";
import {storeToRefs} from "pinia";

interface YoutubeVue3Ref extends YouTubePlayer{
  player: YouTubePlayer | null
}

const audioPlayerStore = useAudioplayerStore()
const { isPlaying, currentAudioId } = storeToRefs(audioPlayerStore)
const youtube  = ref<YoutubeVue3Ref | null>(null)
const duration = ref()
const remainingTime = ref()

const iframeSrc = computed<string>(() => {
  return `https://www.youtube.com/watch?v=${audioPlayerStore.currentAudioId}`
})

function formatSecondsToTime(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration - minutes * 60);

  // Use padStart to ensure that minutes and seconds are always two digits
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
  console.log('temp', temp)
  console.log('temp2', temp2)
  const temp3 = (formatTimeToSeconds(remainingTime) / formatTimeToSeconds(duration) * 100).toFixed(2)
  console.log('temp3', temp3)
  return temp3
}

const progressBarStyle = ref('')

function getProgressBarStyle(remainingTime: string, duration: string) {
  console.log('remainingTime', remainingTime)
  const string = `width: ${convertRemainingTimeToPercentage(remainingTime, duration)}%`
  progressBarStyle.value = string
  console.log('string', string)
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
  audioPlayerStore.incrementCurrentAudioIndex()
  audioPlayerStore.setCurrentAudioIdByIndex(audioPlayerStore.currentAudioIndex)
  audioPlayerStore.setCurrentTypeByIndex(audioPlayerStore.currentAudioIndex)
  audioPlayerStore.setCurrentCommentPathByIndex(audioPlayerStore.currentAudioIndex)
  audioPlayerStore.setIsCommentary(!!audioPlayerStore.currentCommentPath)
}

function played(){
  audioPlayerStore.setIsPlaying(true)
}
function paused(){
  audioPlayerStore.setIsPlaying(false)
}
</script>

<style>
iframe {
  width: 100%;
  height: 100%;
  @apply aspect-video;
}
</style>