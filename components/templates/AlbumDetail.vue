<template>
  <div class="content">
    <ContentDoc />
  </div>
</template>

<style>
.content h1 {
  @apply font-display;
  @apply text-3xl;
  @apply mb-8;
  @apply mt-2;
}

.content h2 {
  @apply font-bold;
  @apply mt-4;
}
.content p {
  @apply text-gray-20;
  @apply text-lg;
}
.content p a {
  @apply text-text;
}
.content p a:hover {
  color: white;
}
</style>
