<template>
  <div class="min-h-screen font-mono dark:bg-background dark:text-text">
    <AppHeader ref="appHeader" />
    <AppContainer :style="contentStyle" class="py-24">
      <NuxtPage><slot /></NuxtPage>
    </AppContainer>
    <AppFooter ref="appFooter" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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

<style>
main h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
}
</style>
