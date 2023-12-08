<template>
  <div class="min-h-screen dark:bg-background dark:text-text">
    <AppHeader class="relative z-20" ref="appHeader" />
    <AppContainer :style="contentStyle" class="relative z-20 py-24">
      <NuxtPage><slot /></NuxtPage>
    </AppContainer>
    <AppFooter class="relative z-20" ref="appFooter" />
    <div class="bg-gray-90 h-10 w-full fixed bottom-0 z-50"></div>
    <client-only>
      <AppBackground class="z-10 opacity-80 blur-md" />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useWindowSize } from '@vueuse/core'

const { height } = useWindowSize()
const appHeader = ref(null)
const appFooter = ref(null)

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

