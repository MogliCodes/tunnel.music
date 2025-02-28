<template>
  <main>
    <BaseContainer>
      <div class="flex justify-between">
        <BaseHeadline type="h1" element="h1" class="mb-8" text="Playlists" />
      </div>
      <ContentNavigation v-slot="{ navigation }" :query="query">
        <ul class="grid gap-8" :class="columnClass">
          <li v-for="item in playlists" :key="item._path">
            <NuxtLink :to="item._path">
              <MusicTeaser v-bind="item" :is-liked="getUserLikes(item._path)" />
            </NuxtLink>
          </li>
        </ul>
      </ContentNavigation>
    </BaseContainer>
  </main>
</template>

<script setup lang="ts">
interface QueryBuilderParams {
  where?: Array<Record<string, any>>;
  sort?: Array<Record<string, any>>;
  limit?: number;
}

const query: QueryBuilderParams = {
  where: [{ type: 'playlist' }],
  limit: 20,
  sort: [{ date: -1 }],
}

const { data: playlists } = await useAsyncData('playlists', () => 
  queryContent('playlists')
    .where({ type: 'playlist' })
    .sort({ date: -1 })
    .limit(20)
    .find(),
  {
    server: true,
    lazy: false
  }
)

const columnCount = ref(5)

const columnClass = computed<string>(() => {
  return columnCount.value ? `grid-cols-1 md:grid-cols-${columnCount.value}` : 'grid-cols-1 md:grid-cols-3'
})


const userLikes: any = useState('userLikes')

function getUserLikes(path: string) {
  const slug = path.split('/').pop()
  return slug ? userLikes?.value?.includes(slug) : false
}
</script>
