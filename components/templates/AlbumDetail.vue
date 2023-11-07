<template>
  <div class="content">
    <ContentDoc />
  </div>
</template>

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
