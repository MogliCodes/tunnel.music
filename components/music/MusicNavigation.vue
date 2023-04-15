<script setup>
const { data: navigation } = await useAsyncData('navigation', () => {
  return fetchContentNavigation()
})
</script>

<template>
  <div>
    <div v-for="(item, index) in navigation" :key="index">
      {{ item }}
    </div>
  </div>
</template>
