<template>
  <section class="max-w-5xl bg-black bg-opacity-50 p-12">
    <div>
      <AudioPlayerThumbnail :img="currentTrackImg" />
      <audio ref="audioPlayer" class="block h-2 border-2 border-blue-200" :src="trackUrl" @ended="playNextTrack"></audio>
      <div class="progress-bar mx-auto mb-6 max-w-xs">
        <div ref="progressBar" class="progress"></div>
      </div>
      <div class="mx-auto mb-6 flex items-center justify-center gap-4">
        <AudioPlayerControl class="h-8 w-8 p-3" control-type="prev" @click="play" />
        <AudioPlayerControl class="h-12 w-12 p-4" control-type="play" @click="play" />
        <AudioPlayerControl class="h-8 w-8 p-3" control-type="next" @click="playNextTrack" />
      </div>
      <AudioPlayerTrack v-for="(track, index) in playlist?.tracks?.items" :key="index"  :index="index" :track="track" />
    </div>
  </section>
</template>
<script setup >
import SpotifyWebApi from 'spotify-web-api-js';
import AudioPlayerThumbnail from "~/components/audioplayer/AudioPlayerThumbnail.vue";
import AudioPlayerControl from "~/components/audioplayer/AudioPlayerControl.vue";
import AudioPlayerTrack from "~/components/audioplayer/AudioPlayerTrack.vue";


const props = defineProps({
  playlistId: String
})

const config = useRuntimeConfig()
const clientId = config.public.spotify.clientId
const clientSecret = config.public.spotify.clientSecret


const audioPlayer = ref('audioPlayer')
const progressBar = ref('progressBar')

const tracks = ref([])
const trackUrl = ref()
const currentTrackIndex = ref(2)
const currentTrackUrl = computed(() => {
  return tracks?.value?.items?.[currentTrackIndex.value]?.track?.preview_url
})
const currentTrackImg = computed(() => {
  return tracks?.value?.items?.[currentTrackIndex.value]?.track?.album?.images[0].url
})
const playlist = ref()

async function requestAccessToken() {
  const response = await useFetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
    },
    body: 'grant_type=client_credentials'
  })
  const {data} = response
  return  data.value.access_token
}
async function getPlaylist() {
  const accessToken = await requestAccessToken()
  const api = new SpotifyWebApi();
  api.setAccessToken(accessToken);
  playlist.value = await api.getPlaylist(props.playlistId);
  tracks.value = playlist.value.tracks
}
function startPlaylist() {
  currentTrackIndex.value = 1
  trackUrl.value = currentTrackUrl.value
  setTimeout(() => {
    audioPlayer.value.play();
    setInterval(updateProgressBar, 50);
  }, 500)
}
function play() {
  trackUrl.value = currentTrackUrl.value
  setTimeout(() => {
    audioPlayer.value.play();
    setInterval(updateProgressBar, 50);
  }, 500)
}
function stopPlaylist() {
  setTimeout(() => {
    audioPlayer.value.pause();
  }, 50)
}
function playNextTrack() {
  audioPlayer.value.pause();
  currentTrackIndex.value++

}

function updateProgressBar() {
  const progress = audioPlayer.value.currentTime / audioPlayer.value.duration * 100;
  progressBar.value.style.width = `${progress}%`;
}


getPlaylist()









</script>

<style>
.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #ddd;
  position: relative;
}
.progress {
  width: 0;
  height: 100%;
  background-color: #007bff;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
