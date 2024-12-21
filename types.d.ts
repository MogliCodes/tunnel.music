import {Ref} from "vue";

declare module 'vue3-youtube'


type ApiResponse = {
    data: Ref | null
    pending: Ref<boolean>
}
type YoutubeItem = {
    snippet: {
        resourceId: {
            videoId: string
        }
        title
    }
    type: string
}

type PlaylistComment = {
    path: string
    index: number
    text: string
    type: string
  }

type PlaylistData = Array<YoutubeItem | PlaylistComment>