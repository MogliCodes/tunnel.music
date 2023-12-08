<template>
    <div :class="{ 'bg-gray-600 font-bold text-text':isActive }"  class="cursor-pointer border-t-2 border-gray-20 text-gray-20 p-4">
        <span>{{ youtubeTrack.snippet.title }}</span>
    </div>
</template>

<script setup lang="ts">
import { YoutubeItem } from 'types';


type Props = {
    youtubeTrack: YoutubeItem
    isActive: boolean
}
defineProps<Props>()
</script>