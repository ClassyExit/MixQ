<template>
  <button
    @click="deleteSong"
    :disabled="loading"
    class="text-error cursor-pointer ml-auto text-content-base text-sm md:text-xl lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl"
    aria-label="Delete Song"
  >
    <span
      v-if="loading"
      class="loading loading-infinity h-6 w-6 md:h-8 md:w-8 lg:h-6 lg:w-6 xl:h-8 xl:w-8 2xl:h-10 2xl:w-10 3xl:h-12 3xl:w-12"
    ></span>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      class="h-6 w-6 md:h-8 md:w-8 lg:h-6 lg:w-6 xl:h-8 xl:w-8 2xl:h-10 2xl:w-10 3xl:h-12 3xl:w-12 4xl:h-16 4xl:w-16 5xl:h-20 5xl:w-20 6xl:h-26 6xl:w-26"
    >
      <path
        fill="currentColor"
        d="M9.808 17h1V8h-1zm3.384 0h1V8h-1zM6 20V6H5V5h4v-.77h6V5h4v1h-1v14z"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useQueueStore } from "../stores/queue";
import { ref } from "vue";

const props = defineProps<{
  video_id: string;
}>();

const queueStore = useQueueStore();
const loading = ref(false);

const deleteSong = async () => {
  loading.value = true;
  await queueStore.removeSong(props.video_id);
  loading.value = false;
};
</script>
