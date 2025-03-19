<template>
  <div class="visualizer-container">
    <iframe
      :src="`https://www.youtube.com/embed/4urV9hOnltg?autoplay=1&mute=1`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      class="absolute top-0 left-0 w-1/2 h-full"
    ></iframe>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const videoId = ref("dQw4w9WgXcQ");
const youtubeFrame = ref(null);
const canvas = ref(null);

const youtubeEmbedUrl = computed(
  () => `https://www.youtube.com/embed/Zi_XLOBDo_Y?autoplay=1`
);
</script>

<style scoped></style>
