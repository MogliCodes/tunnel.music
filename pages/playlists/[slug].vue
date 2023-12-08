<template>
  <main>
    <BaseContainer>
      <div class="flex gap-24">
        <div class="content w-1/2">
          <ContentDoc/>
        </div>
        <div class="w-1/2">
<!--          <client-only>-->
<!--            <PlaylistWrapper-->
<!--                :comments="page?.comments || []"-->
<!--                :playlist-id="page?.playlistId"/>-->
<!--          </client-only>-->
        </div>
      </div>
    </BaseContainer>
  </main>
</template>

<script setup>
import {useAudioplayerStore} from "~/store/audioplayer";
import PlaylistWrapper from "~/components/playlist/PlaylistWrapper.vue";

const audioStore = useAudioplayerStore()

const {page} = useContent()
audioStore.clearPlaylistData()
</script>

<style>
.content h1 {
  @apply font-display;
  @apply text-4xl;
  @apply mb-8;
  @apply mt-2;
}

.content h2 {
  @apply font-bold;
  @apply mt-4;
}
.content p {
  @apply text-gray-20;
}
.content p a {
  border-bottom: 2px solid white;
}
.content p a:hover {
  color: white;
}
</style>

