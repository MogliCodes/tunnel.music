<template>
  <div class="min-h-screen dark:bg-background dark:text-text">
    <AppHeader class="relative z-20" ref="appHeader" />
    <AppContainer :class="appStore.tunnelMode ? 'tunnel-mode' : ''"  ref="appContainer" :style="contentStyle" class="transition-all duration-500 relative z-20 py-24">
      <NuxtPage><slot /></NuxtPage>
    </AppContainer>
    <AppFooter class="relative z-20" ref="appFooter" />
    <client-only>
      <AppBackground class="z-10 opacity-80 transition-all duration-1000" :class="appStore.tunnelMode ? '' :'blur-md'" />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useWindowSize } from '@vueuse/core'
import {useAppStore} from "~/store/app";
import {storeToRefs} from "pinia";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - tunnel.music` : 'tunnel.music';
  }
})

const { height } = useWindowSize()
const appStore = useAppStore()
const appHeader = ref(null)
const appFooter = ref(null)
const appContainer = ref(null)


const headerHeight = computed<number>(() => {
  return appHeader?.value?.$el?.clientHeight
})

const footerHeight = computed<number>(() => {
  return appFooter?.value?.$el?.clientHeight
})

const contentHeight = ref(0)
const contentStyle = ref('')

onMounted(() => {
  contentHeight.value = height.value - (headerHeight.value + footerHeight.value)
  contentStyle.value = `min-height: ${contentHeight.value}px;`
})
</script>

<style>
  .tunnel-mode {
    opacity: 0;
  }
</style>
