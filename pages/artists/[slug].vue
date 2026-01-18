<template>
  <BaseContainer>
    <BaseHeadline type="h1" :text="page.name">{{page.name }}</BaseHeadline>
  </BaseContainer>
  <BaseContainer>
    <ContentNavigation v-if="query" v-slot="{ navigation }" :query="query">
      <div v-if="navigation">
        <ul class="grid gap-2 md:gap-8">
          <li v-for="item in navigation" :key="item._path">
            {{ item }}
          </li>
        </ul>
      </div>
    </ContentNavigation>
  </BaseContainer>
</template>

<script setup lang="ts">
import type {QueryBuilderParams} from "@nuxt/content/types";

const { page } = useContent()
const query: Ref<QueryBuilderParams> = ref()
watch(page, () => {
  query.value = {
    where: [{ type: 'album', artist: page.name }],
    limit: 20,
    sort: [{ date: -1 }],
  }
})

</script>