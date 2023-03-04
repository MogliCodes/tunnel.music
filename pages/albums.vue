<template>
  <main>
    <h1>Albums</h1>
    <ContentNavigation :query="query" />
  </main>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
const query: QueryBuilderParams = { where: [{ type: 'album' }], limit: 5, sort: [{ date: -1 }] }
</script>
