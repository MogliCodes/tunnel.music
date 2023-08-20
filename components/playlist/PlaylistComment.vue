<template>
    <div :class="{ 'bg-gray-600 font-bold': isActive }" class="cursor-pointer border-t-2 border-white p-4">
        <span>{{ comment.text }}</span>
    </div>
</template>

<script setup lang="ts">
import { PlaylistComment } from 'types';


type Props = {
    comment: PlaylistComment
    isActive: boolean
}
defineProps<Props>()
</script>