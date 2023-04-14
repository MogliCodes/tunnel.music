<template>
  <main>
    <h1>Playlists</h1>
    <div>
      <ContentNavigation v-slot="{ navigation }" :query="query">
        <ul>
          <li v-for="item of navigation" :key="item._path">
            <NuxtLink :to="item._path">
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </ContentNavigation>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
const query: QueryBuilderParams = { where: [{ type: 'playlist' }], limit: 5 }
</script>
