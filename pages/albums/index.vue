<template>
  <main>
    <div class="flex justify-between">
      <h1 class="font-display uppercase text-8xl mb-8">Albums</h1>
    </div>
    <ContentNavigation v-slot="{ navigation }" :query="query">
      <div v-if="navigation">
        <ul class="grid gap-8" :class="columnClass">
          <li v-for="item in navigation?.[0].children" :key="item._path">
            <NuxtLink :to="item._path">
              <MusicTeaser v-bind="item" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </ContentNavigation>
  </main>
</template>

<script setup lang="ts">
// ts-ignore
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
const query: QueryBuilderParams = {
  where: [{ type: 'album' }],
  limit: 20,
  sort: [{ date: -1 }],
}

const columnCount = ref(4)

const columnClass = computed<string>(() => {
  return columnCount.value ? `grid-cols-${columnCount.value}` : 'grid-cols-3'
})
</script>
