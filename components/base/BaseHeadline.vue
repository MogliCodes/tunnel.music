<template>
  <component :class="fontClass" :is="type">{{ props.text }}</component>
</template>

<script setup lang="ts">
type Props = {
  text: string
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const props = defineProps<Props>()

const STYLE_MAP = {
  h1: 'text-3xl xs:text-2xl sm:text-3xl md:text-4xl md:text-8xl font-display font-bold',
  h2: 'text-xl xs:text-xl sm:text-2xl md:text-4xl font-display font-bold',
  h3: 'text-2xl font-bold',
  h4: 'text-lg font-bold',
  h5: 'font-bold',
}

const fontClass = computed<string>(() => {
  return STYLE_MAP[props.type]
})
</script>

<style></style>
