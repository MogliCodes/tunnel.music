<template>
    <div :class="{ 'bg-gray-600 font-bold': isActive }" class="cursor-pointer border-t-2 border-gray-20 text-gray-20 p-4">
        <span>{{ comment.text }}</span>
    </div>
</template>

<script setup lang="ts">

import type {PlaylistComment} from "~/types";

type Props = {
    comment: PlaylistComment
    isActive: boolean
}
defineProps<Props>()
</script>