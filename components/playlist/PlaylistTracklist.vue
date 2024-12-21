<template>
    <section class="px-8 pb-8">
      <div v-for="(playlistItem, index) in props.playlistItems" :key="index">
        <PlaylistComment @click="toggleComment((playlistItem as PlaylistComment), index)"  v-if="playlistItem.type ==='PlaylistComment'" :comment="(playlistItem as PlaylistComment)" :is-active="isActive(index)" />
        <PlaylistYoutubeTrack @click="toggleTrack((playlistItem as YoutubeItem), index)"  v-if="playlistItem.type ==='PlaylistYoutubeTrack'" :youtube-track="(playlistItem as YoutubeItem)" :is-active="isActive(index)" />
      </div>
    </section>
</template>

<script setup lang="ts">
import { useAudioplayer } from '~/composables/useAudioPlayer'
import type { PlaylistComment, YoutubeItem } from '~/types.d.ts';

const { setCurrentAudioIndex, setCurrentAudioIdByIndex, setCurrentType, setIsCommentary, setCurrentCommentPath, currentAudioIndex } = useAudioplayer()

type Props = {
    playlistItems: Array<PlaylistComment | YoutubeItem> | null
}

const props = defineProps<Props>()

function toggleComment(comment: PlaylistComment, index: number): void {
    setCurrentAudioIndex(index)
    setCurrentAudioIdByIndex(index)
    setCurrentType(comment.type)
    setIsCommentary(true)
    setCurrentCommentPath(comment.path)
}

function toggleTrack(track: YoutubeItem, index: number): void {
    setCurrentAudioIndex(index)
    setCurrentAudioIdByIndex(index)
    setCurrentType(track.type)
    setIsCommentary(false)
}

function isActive(index: number): boolean {
  return index === currentAudioIndex.value
}
</script>