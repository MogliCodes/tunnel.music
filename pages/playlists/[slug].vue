<template>
  <main>
    <BaseContainer>
      <div class="flex-col lg:flex-row justify-center flex gap-24">

        <div class="w-full lg:w-3/4">
          <div class="content w-full">
            <div class="flex justify-between">
              <div class="flex gap-1">
                <NuxtLink :to="`/genres/${slugifyGenre(genre)}`" class="bg-gray-90 text-gray-20 text-xs p-2 rounded-md line-clamp-1 bottom-0" v-for="genre in page.genres">{{ genre }}</NuxtLink>
              </div>
              <div class="group relative"  v-if="userLikes">
                <div class="absolute opacity-0 group-hover:opacity-100 transition-opacity rounded-md text-xs text-gray-20 bg-gray-90 p-2 left-0 -translate-x-[calc(50%-16px)] -translate-y-full whitespace-nowrap">{{ count }} people like this!</div>
                <HeartIcon @click="removeLike()" class="cursor-pointer w-8 h-8 fill-text" v-if="getUserLikes()" />
                <HeartIcon @click="addLike()" class="cursor-pointer w-8 h-8 fill-selectionForeground" v-else />
              </div>
            </div>
            <ContentDoc/>
          </div>
          <client-only>
            <PlaylistWrapper
                :comments="page?.comments || []"
                :playlist-id="page?.playlistId"/>
          </client-only>
        </div>
      </div>
    </BaseContainer>
  </main>
</template>

<script setup lang="ts">
import {useAudioplayerStore} from "~/store/audioplayer";
import PlaylistWrapper from "~/components/playlist/PlaylistWrapper.vue";
import HeartIcon from "assets/icons/HeartIcon.vue";

const audioStore = useAudioplayerStore()
const client = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()
const userLikes: any = useState('userLikes')

const {page} = useContent()
audioStore.clearPlaylistData()

function getUserLikes() {
  console.log(userLikes?.value)
  console.log(route.path.split('/').pop())

  return userLikes?.value?.includes(route.path.split('/').pop())
}

async function addLike() {
  const route = useRoute()
  const likeName: any = route.path.split('/').pop()
  console.log('likeName', likeName)
  console.log('user', user.value.id)
  if(user.value === null) {
    return
  }
  // @ts-ignore
  await client.from('Likes').upsert([{user_id: user.value.id, name: likeName}])
}

async function removeLike() {
  const route = useRoute()
  const likeName: any = route.path.split('/').pop()
  console.log('likeName', likeName)
  console.log('user', user.value.id)
  if(user.value === null) {
    return
  }
  // @ts-ignore
  await client.from('Likes').delete().eq('name', likeName).eq('user_id', user.value.id)
}

const { data, error, count } =  await client
    .from('Likes')
    .select('*', { count: 'exact', head: true })
    .eq('name', route.path.split('/').pop())


function slugifyGenre(genre: string) {
  return genre.toLowerCase().replace(/ /g, '-')
}

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

