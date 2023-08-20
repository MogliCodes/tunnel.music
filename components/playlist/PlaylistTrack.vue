<template>
    <div class="w-full bg-black aspect-video">
        <PlaylistTrackComment v-if="audioStore.currentType === 'PlaylistComment'" />            
        <PlaylistTrackYoutube v-else />
    </div>
</template>

<script setup lang="ts">
import { useAudioplayerStore } from '~/store/audioplayer';

const audioStore = useAudioplayerStore()
</script>