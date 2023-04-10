<template>
  <div class="my-4 flex gap-4">
    <AudioPlayerControl control-type="prev" />
    <AudioPlayerControl control-type="play" />
    <AudioPlayerControl control-type="next" />
  </div>
</template>
<script setup lang="ts">
import AudioPlayerControl from "~/components/audioplayer/AudioPlayerControl.vue";
</script>
