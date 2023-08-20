import {Ref} from "vue";

declare module 'vue3-youtube'

type YoutubeItem = {
    snippet: {
        resourceId: {
            videoId: string
        }
    }
}
type ApiResponse = {
    data: Ref | null
    pending: Ref<boolean>
}
type MergedDataItem = YoutubeItem | object
type MergedData = MergedDataItem[]
