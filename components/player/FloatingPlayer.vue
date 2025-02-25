<template>
    <Transition name="slide">
        <div v-if="isPlaying || isMinimized" :class="[
            'fixed transition-all duration-300 ease-in-out z-50',
            isMinimized ? 'bottom-4 right-4 w-80' : 'bottom-0 right-0 w-full lg:w-1/3'
        ]">
            <div class="bg-zinc-900 rounded-lg shadow-xl overflow-hidden">
                <!-- Header with controls -->
                <div class="flex items-center justify-between p-2 bg-zinc-800">
                    <button @click="toggleMinimize" class="text-gray-400 hover:text-white p-1">
                        <span v-if="isMinimized">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clip-rule="evenodd" />
                            </svg>
                        </span>
                    </button>
                    <div class="flex-1 mx-2">
                        <p class="text-sm text-white truncate">{{ currentTrackTitle }}</p>
                    </div>
                    <button @click="close" class="text-gray-400 hover:text-white p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>

                <!-- Player Container -->
                <div :class="['relative', isMinimized ? 'h-32' : 'h-48']">
                    <client-only>
                        <template v-if="currentType === 'PlaylistYoutubeTrack'">
                            <YoutubePlayer ref="youtubePlayer" :video-id="currentVideoId" :player-vars="playerConfig"
                                @ready="onPlayerReady" @state-change="onPlayerStateChange" @error="onPlayerError"
                                class="w-full h-full" />
                        </template>
                        <template v-else-if="currentType === 'PlaylistComment' && currentTrack?.path">
                            <div class="h-full flex items-center justify-center bg-zinc-800 px-4">
                                <audio ref="audioPlayer" class="w-full" :src="currentTrack.path" controls
                                    @play="setIsPlaying(true)" @pause="setIsPlaying(false)" @ended="handleTrackEnd" />
                            </div>
                        </template>
                    </client-only>
                </div>

                <!-- Controls -->
                <div class="p-2 bg-zinc-800">
                    <div class="flex items-center justify-between">
                        <button class="text-gray-400 hover:text-white p-1" :disabled="isFirstTrack" @click="playPrev">
                            <img class="h-5 w-5" src="/player-control-01.svg" alt="Previous" />
                        </button>
                        <button class="text-gray-400 hover:text-white p-1" @click="togglePlay">
                            <img class="h-6 w-6" :src="isPlaying ? '/player-control-04.svg' : '/player-control-02.svg'"
                                :alt="isPlaying ? 'Pause' : 'Play'" />
                        </button>
                        <button class="text-gray-400 hover:text-white p-1" :disabled="isLastTrack" @click="playNext">
                            <img class="h-5 w-5" src="/player-control-03.svg" alt="Next" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { YT } from '@types/youtube'
import { useYoutube } from '~/composables/useYoutube'
import YoutubePlayer from '~/components/wrapper/YoutubePlayer.vue'

const {
    isPlaying,
    currentAudioId,
    currentAudioIndex,
    currentType,
    playlistData,
    setIsPlaying,
    incrementCurrentAudioIndex,
    decrementCurrentAudioIndex,
    setCurrentAudioIdByIndex,
    setCurrentType
} = useYoutube()

const youtubePlayer = ref<any>(null)
const audioPlayer = ref<HTMLAudioElement | null>(null)
const player = ref<YT.Player | null>(null)
const isMinimized = ref(false)

const currentVideoId = computed(() => currentAudioId.value || '')
const isFirstTrack = computed(() => currentAudioIndex.value === 0)
const isLastTrack = computed(() => {
    if (!playlistData.value) return true
    return currentAudioIndex.value === playlistData.value.length - 1
})

const currentTrack = computed(() => {
    if (!playlistData.value || currentAudioIndex.value === undefined) return null
    return playlistData.value[currentAudioIndex.value]
})

const currentTrackTitle = computed(() => {
    if (!currentTrack.value) return 'No track selected'
    if (currentTrack.value.type === 'PlaylistYoutubeTrack') {
        return currentTrack.value.title
    }
    if (currentTrack.value.type === 'PlaylistComment') {
        return currentTrack.value.title || 'Commentary'
    }
    return 'Unknown Track'
})

const playerConfig = {
    autoplay: 1,
    controls: 1,
    modestbranding: 1,
    rel: 0,
    origin: window?.location?.origin || 'http://localhost:3000',
    enablejsapi: 1,
    playsinline: 1,
    showinfo: 0,
    fs: 1,
    iv_load_policy: 3,
    color: 'white',
    cc_load_policy: 0
}

function toggleMinimize() {
    isMinimized.value = !isMinimized.value
}

function close() {
    setIsPlaying(false)
    if (player.value) {
        player.value.stopVideo()
    }
}

function togglePlay() {
    if (player.value) {
        if (isPlaying.value) {
            player.value.pauseVideo()
        } else {
            player.value.playVideo()
        }
    }
}

function playNext() {
    if (!isLastTrack.value) {
        incrementCurrentAudioIndex()
        setCurrentAudioIdByIndex(currentAudioIndex.value)
        setIsPlaying(true)
    }
}

function playPrev() {
    if (!isFirstTrack.value) {
        decrementCurrentAudioIndex()
        setCurrentAudioIdByIndex(currentAudioIndex.value)
        setIsPlaying(true)
    }
}

function onPlayerReady(event: YT.PlayerEvent) {
    player.value = event.target
}

function onPlayerStateChange(event: YT.OnStateChangeEvent) {
    switch (event.data) {
        case YT.PlayerState.PLAYING:
            setIsPlaying(true)
            break
        case YT.PlayerState.PAUSED:
            setIsPlaying(false)
            break
        case YT.PlayerState.ENDED:
            if (!isLastTrack.value) {
                playNext()
            } else {
                setIsPlaying(false)
            }
            break
    }
}

function onPlayerError(event: YT.OnErrorEvent) {
    console.error('YouTube Player Error:', event)
    setIsPlaying(false)
}

function handleTrackEnd() {
    if (!isLastTrack.value) {
        playNext()
    } else {
        setIsPlaying(false)
    }
}

// Clean up on component unmount
onUnmounted(() => {
    if (player.value) {
        try {
            player.value.destroy()
        } catch (error) {
            console.error('Error destroying player:', error)
        }
    }
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(100%);
    opacity: 0;
}

:deep(iframe) {
    width: 100% !important;
    height: 100% !important;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}
</style>