<template>
  <div>
    <iframe
      :src="url"
      width="100%"
      height="600"
      allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  </div>
</template>
<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: true,
  },
})
</script>
