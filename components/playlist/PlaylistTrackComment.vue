<template>
    <div class="h-full flex items-end" v-if="currentCommentPath">
        <audio ref="audioPlayer" class="w-full" :src="currentCommentPath" type="audio/x-m4a" controls></audio>
    </div>
</template>

<script setup lang="ts">
import { useAudioplayer } from '~/composables/useAudioPlayer'

type Props = {
    isActive: boolean
}
defineProps<Props>()

const {
    isPlaying,
    isCommentary,
    currentCommentPath,
    setIsPlaying,
    incrementCurrentAudioIndex,
    setCurrentAudioIdByIndex,
    setCurrentTypeByIndex,
    setCurrentCommentPathByIndex,
    setIsCommentary,
    currentAudioIndex
} = useAudioplayer()

const audioPlayer = ref<HTMLAudioElement>()

onMounted(() => {
    if(!audioPlayer || !audioPlayer.value) return
    isPlaying.value ? audioPlayer.value.play() : audioPlayer.value.pause()

    audioPlayer.value.onended = function() {
        incrementCurrentAudioIndex()
        if (currentAudioIndex.value !== null) {
            setCurrentAudioIdByIndex(currentAudioIndex.value)
            setCurrentTypeByIndex(currentAudioIndex.value)
            setCurrentCommentPathByIndex(currentAudioIndex.value)
        }
        setIsCommentary(!!currentCommentPath.value)
    };

    audioPlayer.value.onpause = function() {
        console.log('pause')
        setIsPlaying(false)
    }

    audioPlayer.value.onplay = function() {
        setIsPlaying(true)
    }

    audioPlayer.value.onchange = function(event) {
        console.log(event)
    }
})

watch(isPlaying, () => {
    console.log('isplaying', isPlaying)
    if(!audioPlayer || !audioPlayer.value) return
    if(isPlaying.value && isCommentary.value) {
        audioPlayer.value.play()
    } else {
        audioPlayer.value.pause()
        console.log("SHOULD PAUSE")
    }
})
</script>