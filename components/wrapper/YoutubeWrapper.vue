<template>
    <div class="w-full space-y-4 bg-gray-50/80">
        <!-- Player -->
        <YoutubePlayer ref="playerRef" :playlist="formattedPlaylist" :current-index="currentIndex"
            v-model:is-playing="isPlaying" v-model:current-time="currentTime" v-model:duration="duration"
            @update:current-index="currentIndex = $event" />

        <!-- Controls -->
        <div class="h-16 w-full rounded-lg bg-gray-100 shadow-sm">
            <div class="flex h-full items-center justify-between px-4">
                <!-- Track Info -->
                <div class="flex items-center gap-3 min-w-0 w-1/3">
                    <div class="relative h-10 w-10 shrink-0 overflow-hidden rounded-md">
                        <img v-if="currentTrack?.thumbnail" :src="currentTrack.thumbnail" :alt="currentTrack.title"
                            class="h-full w-full object-cover" />
                    </div>
                    <div class="min-w-0">
                        <p class="truncate text-sm font-medium text-gray-900">
                            {{ currentTrack?.title || 'No track selected' }}
                        </p>
                    </div>
                </div>

                <!-- Controls -->
                <div class="flex items-center justify-center gap-4 w-1/3">
                    <button
                        class="h-8 w-8 rounded-full bg-gray-200/80 p-1.5 transition-all hover:bg-gray-300/80 disabled:opacity-40 disabled:cursor-not-allowed"
                        :disabled="currentIndex === 0" @click="handlePrevious">
                        <img class="h-full w-full transform transition-transform hover:-translate-x-0.5"
                            :src="'/player-control-01.svg'" alt="Previous" />
                    </button>

                    <button
                        class="h-12 w-12 rounded-full bg-gray-200/90 p-2.5 transition-all hover:bg-gray-300/90 transform hover:scale-105 shadow-sm"
                        @click="handlePlayPause">
                        <img class="h-full w-full"
                            :src="isPlaying ? '/player-control-04.svg' : '/player-control-02.svg'"
                            :alt="isPlaying ? 'Pause' : 'Play'" />
                    </button>

                    <button
                        class="h-8 w-8 rounded-full bg-gray-200/80 p-1.5 transition-all hover:bg-gray-300/80 disabled:opacity-40 disabled:cursor-not-allowed"
                        :disabled="currentIndex === formattedPlaylist.length - 1" @click="handleNext">
                        <img class="h-full w-full transform transition-transform hover:translate-x-0.5"
                            :src="'/player-control-03.svg'" alt="Next" />
                    </button>
                </div>

                <!-- Time Info -->
                <div class="flex items-center justify-end w-1/3">
                    <span class="text-gray-600 text-sm font-medium tabular-nums">
                        {{ formattedTime }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Playlist -->
        <div class="w-full rounded-lg bg-gray-100 shadow-sm max-h-[500px] overflow-y-auto scrollbar-hide">
            <div class="divide-y divide-gray-200/30">
                <button v-for="(track, index) in formattedPlaylist" :key="track.videoId"
                    class="w-full cursor-pointer px-3 py-2 text-left transition-all hover:bg-gray-200/40" :class="[
                        currentIndex === index
                            ? 'bg-gray-200/60 text-gray-900'
                            : 'text-gray-700'
                    ]" @click="handleTrackClick(index)">
                    <div class="flex items-center gap-3">
                        <div class="relative h-10 w-10 shrink-0 overflow-hidden rounded-md">
                            <img :src="track.thumbnail" :alt="track.title" class="h-full w-full object-cover" />
                            <div v-if="currentIndex === index && isPlaying"
                                class="absolute inset-0 flex items-center justify-center bg-black/40">
                                <div class="h-4 w-4">
                                    <img :src="'/player-control-04.svg'" alt="Now Playing"
                                        class="h-full w-full brightness-0 invert opacity-90" />
                                </div>
                            </div>
                        </div>
                        <div class="flex h-10 flex-1 min-w-0">
                            <p class="truncate text-sm my-auto"
                                :class="[currentIndex === index ? 'text-gray-900 font-medium' : 'text-gray-700']">
                                {{ track.title }}
                            </p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { YT } from '@types/youtube'
import YoutubePlayer from './YoutubePlayer.vue'
import type { PlaylistComment } from '~/types'

interface Props {
    playlistId: string
    comments?: PlaylistComment[]
}

const props = defineProps<Props>()
const config = useRuntimeConfig()

// State
const playerRef = ref<{
    play: () => void
    pause: () => void
    seekTo: (seconds: number) => void
    currentTime?: number
    duration?: number
} | null>(null)
const currentIndex = ref(0)
const isPlaying = ref(false)
const rawPlaylist = ref<any[]>([])
const currentTime = ref(0)
const duration = ref(0)

// Format time helper
function formatTime(seconds: number): string {
    if (!seconds) return '0:00'
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

// Computed for formatted time
const formattedTime = computed(() => {
    return `${formatTime(currentTime.value)} / ${formatTime(duration.value)}`
})

// Fetch playlist data
const { data: playlistData } = await useFetch(
    `https://www.googleapis.com/youtube/v3/playlistItems`,
    {
        params: {
            part: 'snippet',
            maxResults: '50',
            playlistId: props.playlistId,
            key: config.public.youtube.apiKey
        }
    }
)

// Format playlist data
const formattedPlaylist = computed(() => {
    if (!playlistData.value?.items) return []

    const youtubeItems = playlistData.value.items.map(item => ({
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.default?.url || '',
        type: 'PlaylistYoutubeTrack' as const
    }))

    if (!props.comments) return youtubeItems

    const mergedData = [...youtubeItems]
    props.comments.forEach(comment => {
        if (comment.index >= 0 && comment.index <= mergedData.length) {
            mergedData.splice(comment.index, 0, {
                videoId: '',
                title: comment.text,
                thumbnail: '',
                type: 'PlaylistComment' as const,
                path: comment.path
            })
        }
    })

    return mergedData
})

// Add computed for current track
const currentTrack = computed(() => formattedPlaylist.value[currentIndex.value] || null)

// Event Handlers
function handleTrackClick(index: number) {
    if (index === currentIndex.value) {
        handlePlayPause()
    } else {
        currentIndex.value = index
        isPlaying.value = true
    }
}

async function handlePlayPause() {
    if (!playerRef.value) {
        console.warn('Player not ready')
        return
    }

    try {
        if (isPlaying.value) {
            await playerRef.value.pause()
        } else {
            await playerRef.value.play()
        }
        isPlaying.value = !isPlaying.value
    } catch (error) {
        console.error('Error controlling player:', error)
    }
}

function handlePrevious() {
    if (currentIndex.value > 0) {
        currentIndex.value--
        isPlaying.value = true
    }
}

function handleNext() {
    if (currentIndex.value < formattedPlaylist.value.length - 1) {
        currentIndex.value++
        isPlaying.value = true
    }
}

// Helper function to split title into title and artist
function formatTitle(fullTitle: string) {
    const separators = [' - ', ' – ', ' — ', ' | ', ' // ']
    for (const separator of separators) {
        if (fullTitle.includes(separator)) {
            const [artist, title] = fullTitle.split(separator)
            return { title: title?.trim() || fullTitle, artist: artist?.trim() }
        }
    }

    // Check for "by" format
    const byMatch = fullTitle.match(/(.*?)\s+by\s+(.*)/i)
    if (byMatch) {
        return { title: byMatch[1].trim(), artist: byMatch[2].trim() }
    }

    return { title: fullTitle, artist: '' }
}
</script>

<style>
.scrollbar-hide {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari and Opera */
}
</style>