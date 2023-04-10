<template>
  <main>
    <div class="flex flex-col gap-12 xl:w-7/12">
      <ContentDoc />
      <AudioPlayer :playlist-id="page.playlistId" />
    </div>
  </main>
</template>

<script setup>
import AudioPlayer from "~/components/audioplayer/AudioPlayer.vue";

const { page } = useContent()
</script>
