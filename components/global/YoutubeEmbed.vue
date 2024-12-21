<template>
  <div>
    <div v-if="loading" class="skeleton-loader aspect-video" style="border-radius: 12px; width: 100%;"></div>
    <iframe
        v-else
        class="aspect-video"
        style="border-radius: 12px"
        width="100%"
        :src="url"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        @load="onLoad"
        @error="onError"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

const loading = ref(true)

function onLoad() {
  loading.value = false
}

function onError() {
  console.error('Failed to load iframe')
  loading.value = false
}

// Fallback: Set a timeout to stop showing the loader if the iframe doesn't load
onMounted(() => {
  setTimeout(() => {
    if (loading.value) {
      console.warn('Iframe loading timeout')
      loading.value = false
    }
  }, 1000) // Adjust timeout duration as needed
})
</script>

<style scoped>
.skeleton-loader {
  background: linear-gradient(90deg, #3a3a3a 25%, #4a4a4a 50%, #3a3a3a 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
