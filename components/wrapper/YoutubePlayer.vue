<template>
    <div class="w-full overflow-hidden rounded-xl bg-zinc-900 shadow-lg">
        <!-- Player Container -->
        <div v-if="currentTrack" class="relative flex flex-col">
            <!-- Main Player Area -->
            <div class="relative h-48">
                <client-only>
                    <template v-if="isYoutubeTrack">
                        <div class="absolute inset-0">
                            <ScriptYouTubePlayer ref="youtubePlayer" :video-id="currentTrack.videoId"
                                :player-vars="playerConfig" @ready="onPlayerReady" @state-change="onPlayerStateChange"
                                @error="onPlayerError" class="w-full h-full" :width="playerWidth" :height="playerHeight"
                                :trigger="'visible'">
                                <template #loading>
                                    <div
                                        class="absolute inset-0 flex items-center justify-center bg-zinc-900/90 backdrop-blur-sm">
                                        <div
                                            class="animate-spin rounded-full h-8 w-8 border-2 border-zinc-600 border-t-white">
                                        </div>
                                    </div>
                                </template>
                                <template #error>
                                    <div
                                        class="absolute inset-0 flex items-center justify-center bg-zinc-900/90 backdrop-blur-sm">
                                        <div class="text-white text-center">
                                            <p class="text-sm font-medium">Failed to load video</p>
                                            <button @click="reloadPlayer"
                                                class="mt-2 px-3 py-1 bg-white/10 hover:bg-white/20 text-sm font-medium text-white rounded-lg transition-colors">
                                                Try Again
                                            </button>
                                        </div>
                                    </div>
                                </template>
                            </ScriptYouTubePlayer>
                        </div>
                    </template>
                    <template v-else>
                        <div v-if="currentTrack.type === 'PlaylistComment'"
                            class="h-full flex items-center justify-center bg-zinc-800 px-4">
                            <audio ref="audioPlayer" class="w-full" :src="currentTrack.path" controls
                                @play="emit('update:isPlaying', true)" @pause="emit('update:isPlaying', false)"
                                @ended="handleTrackEnd" @loadstart="isLoading = true" @canplay="isLoading = false" />
                        </div>
                    </template>
                </client-only>

                <!-- Loading State (only for non-YouTube content) -->
                <div v-if="!isYoutubeTrack && isLoading"
                    class="pointer-events-none absolute inset-0 flex items-center justify-center bg-zinc-900/90 backdrop-blur-sm">
                    <div class="animate-spin rounded-full h-8 w-8 border-2 border-zinc-600 border-t-white"></div>
                </div>
            </div>
        </div>

        <!-- No Track Selected State -->
        <div v-else class="h-48 flex items-center justify-center bg-zinc-800 text-zinc-400">
            <p class="text-sm font-medium">Select a track to play</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { YT } from '@types/youtube'

interface Track {
    videoId: string
    title: string
    thumbnail?: string
    type: 'PlaylistYoutubeTrack' | 'PlaylistComment'
    path?: string
    artist?: string
    duration?: number
}

// Props
const props = defineProps<{
    playlist: Track[]
    currentIndex: number
}>()

// Emits
const emit = defineEmits<{
    'update:currentIndex': [index: number]
    'update:isPlaying': [isPlaying: boolean]
    'update:currentTime': [time: number]
    'update:duration': [duration: number]
}>()

// State
const youtubePlayer = ref<any>(null)
const player = ref<YT.Player | null>(null)
const audioPlayer = ref<HTMLAudioElement | null>(null)
const isLoading = ref(true)
const currentTime = ref(0)
const duration = ref(0)
const progressInterval = ref<number | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const playerWidth = ref(640)
const playerHeight = ref(360)

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

// Computed
const currentTrack = computed(() =>
    props.playlist[props.currentIndex] || null
)

const isYoutubeTrack = computed(() =>
    currentTrack.value?.type === 'PlaylistYoutubeTrack'
)

const progress = computed(() => {
    if (duration.value === 0) return 0
    return (currentTime.value / duration.value) * 100
})

// Watch for player instance
watch(youtubePlayer, (newPlayer) => {
    if (newPlayer) {
        // Reset loading after a short delay when player instance is available
        setTimeout(() => {
            isLoading.value = false
        }, 2000)
    }
}, { immediate: true })

// Watch for track changes
watch(() => currentTrack.value?.videoId, async (newVideoId) => {
    if (newVideoId) {
        isLoading.value = true
        await new Promise(resolve => setTimeout(resolve, 500))
        if (player.value) {
            try {
                await player.value.loadVideoById(newVideoId)
            } catch (error) {
                isLoading.value = false
            }
        }
    }
}, { immediate: true })

// Helper functions
function formatTime(seconds: number): string {
    if (!seconds) return '0:00'
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

function handleProgressBarClick(event: MouseEvent) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    const clickPosition = event.clientX - rect.left
    const percentage = (clickPosition / rect.width) * 100
    const newTime = (duration.value * percentage) / 100
    seekTo(newTime)
}

function seekTo(seconds: number) {
    if (isYoutubeTrack.value && player.value) {
        player.value.seekTo(seconds, true)
    } else if (audioPlayer.value) {
        audioPlayer.value.currentTime = seconds
    }
}

function startProgressTracking() {
    if (progressInterval.value) return

    progressInterval.value = window.setInterval(() => {
        if (isYoutubeTrack.value && player.value) {
            currentTime.value = player.value.getCurrentTime() || 0
            duration.value = player.value.getDuration() || 0
            emit('update:currentTime', currentTime.value)
            emit('update:duration', duration.value)
        } else if (audioPlayer.value) {
            currentTime.value = audioPlayer.value.currentTime
            duration.value = audioPlayer.value.duration
            emit('update:currentTime', currentTime.value)
            emit('update:duration', duration.value)
        }
    }, 1000)
}

function stopProgressTracking() {
    if (progressInterval.value) {
        window.clearInterval(progressInterval.value)
        progressInterval.value = null
    }
}

// Player Event Handlers
function onPlayerReady(event: YT.PlayerEvent) {
    player.value = event.target

    // Initialize duration if available
    if (player.value && player.value.getDuration) {
        duration.value = player.value.getDuration()
    }

    startProgressTracking()
    isLoading.value = false
}

function onPlayerStateChange(event: YT.OnStateChangeEvent) {
    const stateMap = {
        [-1]: 'UNSTARTED',
        [0]: 'ENDED',
        [1]: 'PLAYING',
        [2]: 'PAUSED',
        [3]: 'BUFFERING',
        [5]: 'CUED'
    }

    switch (event.data) {
        case YT.PlayerState.PLAYING:
            isLoading.value = false
            emit('update:isPlaying', true)
            startProgressTracking()
            break
        case YT.PlayerState.BUFFERING:
            isLoading.value = true
            break
        case YT.PlayerState.ENDED:
            handleTrackEnd()
            stopProgressTracking()
            break
        case YT.PlayerState.PAUSED:
            emit('update:isPlaying', false)
            stopProgressTracking()
            break
    }
}

function onPlayerError(event: YT.OnErrorEvent) {
    emit('update:isPlaying', false)
    isLoading.value = false
    stopProgressTracking()
}

// Track Control Methods
function handleTrackEnd() {
    const nextIndex = props.currentIndex + 1
    if (nextIndex < props.playlist.length) {
        emit('update:currentIndex', nextIndex)
    }
}

// Methods exposed to parent
defineExpose({
    play: async () => {
        if (isYoutubeTrack.value && player.value) {
            try {
                isLoading.value = true
                await player.value.playVideo()
                startProgressTracking()
            } catch (error) {
                isLoading.value = false
            }
        } else if (audioPlayer.value) {
            try {
                isLoading.value = true
                await audioPlayer.value.play()
                startProgressTracking()
            } catch (error) {
                isLoading.value = false
            }
        }
    },
    pause: () => {
        if (isYoutubeTrack.value && player.value) {
            player.value.pauseVideo()
            stopProgressTracking()
            isLoading.value = false
        } else if (audioPlayer.value) {
            audioPlayer.value.pause()
            stopProgressTracking()
            isLoading.value = false
        }
    },
    seekTo
})

// Cleanup
onUnmounted(() => {
    stopProgressTracking()
    if (player.value) {
        try {
            player.value.destroy()
        } catch (error) {
            console.error('Error destroying player:', error)
        }
    }
})

// Add reload function
function reloadPlayer() {
    if (youtubePlayer.value) {
        youtubePlayer.value.reload()
    }
}
</script>

<style scoped>
:deep(iframe) {
    width: 100% !important;
    height: 100% !important;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    border-radius: 0;
}

/* Style audio player for comments */
:deep(audio) {
    height: 36px;
    border-radius: 8px;
}

:deep(audio::-webkit-media-controls-panel) {
    background-color: rgb(39 39 42);
}

:deep(audio::-webkit-media-controls-current-time-display),
:deep(audio::-webkit-media-controls-time-remaining-display) {
    color: rgb(161 161 170);
}
</style>