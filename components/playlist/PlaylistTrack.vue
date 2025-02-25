<template>
    <div class="w-full bg-black aspect-video">
        <PlaylistTrackComment v-if="currentType === 'PlaylistComment'" />
    </div>
</template>

<script setup lang="ts">
import { useAudioplayer } from '~/composables/useAudioPlayer'

const { currentType } = useAudioplayer()
</script>