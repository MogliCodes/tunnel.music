<template>
  <div class="cursor-pointer border-b-2 border-white p-4" @click="emitVideoId">
    <div>{{ attrs?.title }}</div>
  </div>
</template>

<script setup>
const attrs = useAttrs()
const config = useRuntimeConfig()
const apiKey = config.public.youtube.apiKey
const videoId = attrs.id
const videoUrl = ref()
const { data, error } = await useFetch(
  `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=player&key=${apiKey}`,
)

videoUrl.value =
  data?.value?.items?.[0].player.embedHtml.match(/src="([^"]+)"/)[1]

const emit = defineEmits(['videoId'])

if (attrs.index === 0) {
  emit('videoId', attrs.id)
}

function emitVideoId() {
  emit('videoId', attrs.id)
}
</script>
