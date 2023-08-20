<template>
    <div class="h-full flex items-end" v-if="audioPlayerStore.currentCommentPath">
        <audio ref="audioPlayer" class="w-full" :src="audioPlayerStore.currentCommentPath" type="audio/x-m4a" controls></audio>
    </div>
</template>

<script setup lang="ts">
import { useAudioplayerStore  } from '~/store/audioplayer';
import {storeToRefs} from "pinia";

type Props = {
    isActive: boolean
}
defineProps<Props>()

const audioPlayerStore = useAudioplayerStore()
const { isPlaying, isCommentary } = storeToRefs(audioPlayerStore)
const audioPlayer = ref<HTMLAudioElement>()


onMounted(() => {
    if(!audioPlayer || !audioPlayer.value) return
    isPlaying.value ? audioPlayer.value.play() : audioPlayer.value.pause()

    audioPlayer.value.onended = function() {
        audioPlayerStore.incrementCurrentAudioIndex()
        audioPlayerStore.setCurrentAudioIdByIndex(audioPlayerStore.currentAudioIndex)
        audioPlayerStore.setCurrentTypeByIndex(audioPlayerStore.currentAudioIndex)
        audioPlayerStore.setCurrentCommentPathByIndex(audioPlayerStore.currentAudioIndex)
        audioPlayerStore.setIsCommentary(!!audioPlayerStore.currentCommentPath)
    };

    audioPlayer.value.onpause = function() {
        audioPlayerStore.setIsPlaying(false)
    }

    audioPlayer.value.onplay = function() {
        audioPlayerStore.setIsPlaying(true)
    }

    audioPlayer.value.onchange = function(event) {
        console.log(event)
    }
})

watch(isPlaying, () => {
    console.log('isplaying', isPlaying)
    if(!audioPlayer || !audioPlayer.value) return
    if(isPlaying.value && isCommentary) {
        audioPlayer.value.play()
    } else {
        audioPlayer.value.pause()
        console.log("SHOULD PAUSE")
    }
})

</script>