<template>
  <main>
    <div class="flex justify-between">
      <h1>Albums</h1>
      <div class="mb-8 flex w-1/4 items-center">
        <label for="">Amount of columns</label>
        <select
          id=""
          v-model="columnCount"
          class="block w-full bg-gray-900 p-4"
          name=""
        >
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </div>
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

const columnCount = ref(3)

const columnClass = computed<string>(() => {
  return columnCount.value ? `grid-cols-${columnCount.value}` : 'grid-cols-3'
})
</script>
