<template>
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
</template>
<script setup lang="ts">
import {useAppStore} from "~/store/app";

const appStore = useAppStore()

</script>