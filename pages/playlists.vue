<template>
  <main>
    <h1>Playlists</h1>
    <ContentNavigation :query="query" />
  </main>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
const query: QueryBuilderParams = { where: [{ type: 'playlist' }], limit: 5, sort: [{ date: -1 }] }
</script>
