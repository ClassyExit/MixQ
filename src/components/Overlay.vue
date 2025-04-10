<template>
  <div
    class="w-full h-full flex flex-col items-center justify-center bg-black text-white space-y-4"
  >
    <img
      v-if="queueStore.queue?.currentSong?.video_id"
      :src="thumbnailUrl"
      alt="Thumbnail"
      class="w-1/2 h-auto object-cover"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useQueueStore } from "../stores/queue";

const queueStore = useQueueStore();

const thumbnailUrl = computed(() => {
  const videoId = queueStore.queue?.currentSong?.video_id;
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "";
});
</script>
