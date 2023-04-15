<template>
  <div class="mb-6">
    <img class="mx-auto max-w-xs" :src="props.img" alt="" />
  </div>
</template>

<script setup>
const props = defineProps({
  img: String,
})
</script>
