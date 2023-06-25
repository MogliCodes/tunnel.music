<template>
  <div
    class="w-full cursor-pointer border-b-2 border-white p-4"
    :class="{ 'bg-gray-900': props.isActive }"
    @click="emitVideoId"
  >
    <div>{{ props.title }}</div>
  </div>
</template>

<script setup lang="ts">
import { useAudioplayerStore } from '~/store/audioplayer'

const audioStore = useAudioplayerStore()

type Props = {
  title: string
  isActive: boolean
}

const props = defineProps<Props>()

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
  const payload = { id: attrs.id, index: attrs.index }
  audioStore.setCurrentAudioId(attrs.id as string)
  console.log('paylpad', payload)
  emit('videoId', payload)
}
</script>
