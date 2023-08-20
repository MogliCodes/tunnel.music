<template>
    <div v-for="(playlistItem, index) in playlistItems">
        <PlaylistComment @click="toggleComment((playlistItem as PlaylistComment), index)"  v-if="playlistItem.type ==='PlaylistComment'" v-key="index" :comment="(playlistItem as PlaylistComment)" :is-active="isActive(index)" />
        <PlaylistYoutubeTrack @click="toggleTrack((playlistItem as YoutubeItem), index)"  v-if="playlistItem.type ==='PlaylistYoutubeTrack'" :youtube-track="(playlistItem as YoutubeItem)" v-key="index" :is-active="isActive(index)" />
    </div>
</template>

<script setup lang="ts">
import { useAudioplayerStore } from '~/store/audioplayer'
import type { PlaylistComment, YoutubeItem } from '~/types.d.ts';

const audioStore = useAudioplayerStore()

type Props = {
    playlistItems: Array<PlaylistComment | YoutubeItem> | null
}

defineProps<Props>()

function toggleComment(comment: PlaylistComment, index: number): void {
    audioStore.setCurrentAudioIndex(index)
    audioStore.setCurrentAudioIdByIndex(index)
    audioStore.setCurrentType(comment.type) 
    audioStore.setIsCommentary(true)  
    audioStore.setCurrentCommentPath(comment.path)
   
}

function toggleTrack(track: YoutubeItem, index: number): void {
    audioStore.setCurrentAudioIndex(index)
    audioStore.setCurrentAudioIdByIndex(index)
    audioStore.setCurrentType(track.type) 
    audioStore.setIsCommentary(false)
   
}

function isActive(index: number): boolean {
  return index === audioStore?.currentAudioIndex
}


</script>