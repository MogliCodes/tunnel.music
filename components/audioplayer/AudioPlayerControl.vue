<template>
  <div class="rounded-full bg-text">
    <img class="invert" :src="image" alt="">
  </div>
</template>

<script setup>

const props = defineProps({
  controlType: String
})

const image = computed(() => {
  switch(props.controlType) {
    case 'prev':
      return '/img/003-zuruck.png'
    case 'play':
      return '/img/001-wiedergabetaste.png'
    case 'next':
      return '/img/001-nachster.png'
  }
})

</script>
