import { Ref } from "vue";

declare module 'vue3-youtube'

export interface YoutubeState {
    isPlaying: Ref<boolean>
    currentAudioId: Ref<string | null>
    currentAudioIndex: Ref<number>
    currentType: Ref<'PlaylistYoutubeTrack' | 'PlaylistComment' | null>
    playlistData: Ref<Array<YoutubeItem | PlaylistComment> | null>
    isCommentary: Ref<boolean>
    currentCommentPath: Ref<string | null>
}

export interface YoutubeItem {
    id?: string
    snippet: {
        resourceId: {
            videoId: string
        }
        title: string
        thumbnails?: {
            default: {
                url: string
            }
        }
    }
    type: 'PlaylistYoutubeTrack'
}

export interface PlaylistComment {
    index: number
    type: 'PlaylistComment'
    text: string
    path: string
}

export interface ApiResponse {
    data: Ref<{
        items: YoutubeItem[]
    } | null>
    pending: Ref<boolean>
    error: Ref<Error | null>
}