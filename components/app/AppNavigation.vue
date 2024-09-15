<template>
  <div class="flex gap-6">
    <nav>
      <ul>
        <li class="inline-block">
          <nuxt-link active-class="dark:bg-text dark:text-gray-90" class="block rounded-md mr-2 inline-block dark:bg-gray-90 text-gray-20 px-4 py-2 text-sm" to="/albums">albums</nuxt-link>
        </li>
        <li class="inline-block">
          <nuxt-link active-class="dark:bg-text dark:text-gray-90" class="block rounded-md mr-2 inline-block dark:bg-gray-90 text-gray-20 px-4 py-2 text-sm" to="/playlists">playlists</nuxt-link>
        </li>

        <!--      <li class="inline-block">-->
        <!--        <span @click="appStore.setTunnelMode(!appStore.tunnelMode)" active-class="dark:bg-text dark:text-gray-90" class="block cursor-pointer rounded-md inline-block dark:bg-gray-90 text-gray-20 px-4 py-2 text-sm" to="/artists">tunnel mode</span>-->
        <!--      </li>-->
      </ul>
    </nav>
    <div v-if="user" class="flex items-center gap-2">
      <span class="font-bold"></span>
      <div class="relative group">
        <div v-if="user.user_metadata.avatar_url" class="cursor-pointer block w-8 h-8 rounded-full overflow-hidden">
          <img :src="user.user_metadata.avatar_url" alt="">
        </div>
        <div class="opacity-0 text-xs group-hover:opacity-100 bg-gray-90 text-gray-20 rounded-md gap-4 absolute -bottom-2 right-0 translate-y-full bottom-0 z-50 flex flex-col">
          <NuxtLink to="/profile" class="px-6 pt-4 flex gap-2 items-center whitespace-nowrap">
            <Icon class="w-4 h-4" name="heroicons-outline:user" color="gray" />
            <span>{{ user.user_metadata.full_name }}</span>
          </NuxtLink>
          <NuxtLink to="/settings" class="border-b px-6 pb-4 flex gap-2 items-center">
            <Icon class="w-4 h-4" name="heroicons-outline:cog" color="gray" />
            <span>Settings</span>
          </NuxtLink>
          <div class="px-6 pb-4 flex gap-2 items-center">
            <Icon class="w-4 h-4" name="heroicons-outline:logout" color="gray" />
            <button class="cursor-pointer" @click="signOutWithOAuth">Logout</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const signOutWithOAuth = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.log(error)
}

</script>