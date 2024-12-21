<template>
  <div>
    <div
        v-if="loading"
        class="skeleton-loader"
        style="border-radius: 12px; width: 100%; height: 600px;"
    ></div>
    <iframe
        v-else
        :src="url"
        width="100%"
        height="600"
        style="border-radius: 12px;"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        @load="onLoad"
        @error="onError"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});

const loading = ref(true);

function onLoad() {
  loading.value = false;
}

function onError() {
  console.error("Failed to load iframe");
  loading.value = false;
}

// Fallback to ensure `loading` is false after a timeout
onMounted(() => {
  setTimeout(() => {
    if (loading.value) {
      console.warn("Iframe loading timeout");
      loading.value = false;
    }
  }, 1000); // Adjust timeout duration as needed
});
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
