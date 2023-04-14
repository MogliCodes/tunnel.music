<template>
  <main>
    <div class="flex gap-12">
      <div class="w-1/2">
        <ContentDoc v-slot="{ doc }">
          <div class="mb-4 bg-black bg-opacity-50 p-8">
            <div><span>Genres: </span>{{ doc.genres }}</div>
            <div>Platform: {{ doc.platform }}</div>
            <div>Type: {{ doc.type }}</div>
          </div>
          <ContentRenderer :value="doc" />
        </ContentDoc>
      </div>
      <div v-if="page.platform === 'youtube'" class="w-1/2">
       <div class="">
          <YoutubeWrapper :playlist-id="page.playlistId"/>
       </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import YoutubeWrapper from "~/components/wrapper/YoutubeWrapper.vue";

const { page } = useContent()
</script>

<style>
p {
  margin-bottom: 2rem;
}
</style>
