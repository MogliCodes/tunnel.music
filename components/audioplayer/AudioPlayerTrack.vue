<template>
  <div class="p2 border-b border-white p-4">
    <div v-if="currentTrackIndex === attrs?.index">
      <p class="text-green-500">Playing now!</p>
    </div>
    <p class="text-2xl font-bold">{{ attrs?.track.track.name }}</p>
    <div
      v-for="(artist, index) in attrs?.track?.track?.artists"
      :key="`artist-${index}`"
    >
      <span class="text-gray-400">{{ artist.name }}</span>
    </div>
    <div>
      <span class="text-gray-400">{{ attrs?.track.track.album.name }}</span>
    </div>
  </div>
</template>

<script setup>
const attrs = useAttrs()
</script>
