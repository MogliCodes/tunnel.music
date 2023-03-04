<template>
  <div>
    <iframe style="border-radius:12px;" width="100%" height="500" :src="url" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </div>
</template>

<script setup lang="ts">

defineProps({
  url: {
    type: String,
    required: true
  }
})

</script>
