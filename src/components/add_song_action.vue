<template>
  <button
    @click="addSong"
    :disabled="loading"
    class="btn btn-sm ml-auto text-content-base"
    aria-label="Add Song"
  >
    <span
      v-if="loading"
      class="loading loading-spinner text-primary loading-sm"
    ></span>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.5 16.5h1v-4h4v-1h-4v-4h-1v4h-4v1h4zm.503 4.5q-1.867 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { supabase } from "../utils/supabase";
import { ref } from "vue";
import { showNotification } from "../utils/notifications";

const props = defineProps<{
  video_id: string;
  title: string;
  thumbnail: string;
  duration: string;
  code: string;
}>();

const loading = ref(false);

const addSong = async () => {
  loading.value = true;

  try {
    // Fetch existing queue
    const { data, error: fetchError } = await supabase
      .from("songs")
      .select("queue")
      .eq("code", props.code)
      .maybeSingle();

    // Ensure queue is an array
    let existingQueue = Array.isArray(data?.queue) ? data.queue : [];

    // Append new song
    const updatedQueue = [
      ...existingQueue,
      {
        video_id: props.video_id,
        title: props.title,
        thumbnail: props.thumbnail,
        duration: props.duration,
      },
    ];

    // Update database with new queue
    const { error: updateError } = await supabase
      .from("songs")
      .update({ queue: updatedQueue })
      .eq("code", props.code);

    if (updateError || fetchError)
      showNotification("Failed to add song", "error");
    else showNotification("Song added to queue", "success");
  } catch (error: any) {
    showNotification("Failed to add song", "error");
  } finally {
    loading.value = false;
  }
};
</script>
