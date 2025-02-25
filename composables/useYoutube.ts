import type { YoutubeState, YoutubeItem, PlaylistComment } from '~/types'

export function useYoutube() {
    const config = useRuntimeConfig()
    const API_KEY = config.public.youtube.apiKey

    const state = useState<YoutubeState>('youtube', () => ({
        isPlaying: ref(false),
        currentAudioId: ref(null),
        currentAudioIndex: ref(0),
        currentType: ref(null),
        playlistData: ref(null),
        isCommentary: ref(false),
        currentCommentPath: ref(null)
    }))

    // Getters
    function getCurrentTrack() {
        if (!state.value.playlistData?.value || state.value.currentAudioIndex.value === undefined) {
            return null
        }
        return state.value.playlistData.value[state.value.currentAudioIndex.value]
    }

    function getVideoUrl(videoId: string) {
        return `https://www.youtube.com/watch?v=${videoId}`
    }

    // Actions
    function setPlaylistData(data: Array<YoutubeItem | PlaylistComment> | null) {
        state.value.playlistData.value = data
    }

    function setCurrentAudioIndex(index: number) {
        state.value.currentAudioIndex.value = index
    }

    function setCurrentAudioId(id: string | null) {
        state.value.currentAudioId.value = id
    }

    function setCurrentType(type: 'PlaylistYoutubeTrack' | 'PlaylistComment' | null) {
        state.value.currentType.value = type
    }

    function setIsPlaying(playing: boolean) {
        state.value.isPlaying.value = playing
    }

    function setIsCommentary(isCommentary: boolean) {
        state.value.isCommentary.value = isCommentary
    }

    function setCurrentCommentPath(path: string | null) {
        state.value.currentCommentPath.value = path
    }

    function incrementCurrentAudioIndex() {
        if (state.value.currentAudioIndex.value !== undefined &&
            state.value.playlistData?.value &&
            state.value.currentAudioIndex.value < state.value.playlistData.value.length - 1) {
            state.value.currentAudioIndex.value++
        }
    }

    function decrementCurrentAudioIndex() {
        if (state.value.currentAudioIndex.value !== undefined && state.value.currentAudioIndex.value > 0) {
            state.value.currentAudioIndex.value--
        }
    }

    async function fetchPlaylistItems(playlistId: string) {
        try {
            return await useFetch<{ items: YoutubeItem[] }>(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`
            )
        } catch (error) {
            console.error('Error fetching playlist items:', error)
            throw error
        }
    }

    function mergePlaylistData(youtubeItems: YoutubeItem[], comments: PlaylistComment[]) {
        const youtubeDataEnriched = youtubeItems.map(item => ({
            ...item,
            type: 'PlaylistYoutubeTrack' as const
        }))

        const mergedData: Array<YoutubeItem | PlaylistComment> = [...youtubeDataEnriched]

        comments.forEach(comment => {
            const enrichedComment = {
                ...comment,
                type: 'PlaylistComment' as const
            }
            if (enrichedComment.index >= 0 && enrichedComment.index <= mergedData.length) {
                mergedData.splice(enrichedComment.index, 0, enrichedComment)
            }
        })

        return mergedData
    }

    function initializePlaylist() {
        setCurrentAudioIndex(0)
        setCurrentAudioIdByIndex(0)
        if (!state.value.currentAudioId.value) {
            setIsPlaying(false)
        }
    }

    function setCurrentAudioIdByIndex(index: number) {
        const currentTrack = state.value.playlistData?.value?.[index]
        if (currentTrack?.type === 'PlaylistYoutubeTrack') {
            setCurrentAudioId(currentTrack.snippet.resourceId.videoId)
        } else {
            setCurrentAudioId(null)
        }
    }

    return {
        // State
        ...toRefs(state.value),

        // Getters
        getCurrentTrack,
        getVideoUrl,

        // Actions
        setPlaylistData,
        setCurrentAudioIndex,
        setCurrentAudioId,
        setCurrentType,
        setIsPlaying,
        setIsCommentary,
        setCurrentCommentPath,
        incrementCurrentAudioIndex,
        decrementCurrentAudioIndex,
        fetchPlaylistItems,
        mergePlaylistData,
        initializePlaylist,
        setCurrentAudioIdByIndex
    }
} 