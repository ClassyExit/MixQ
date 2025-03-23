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
import { supabase } from "../utils/supabase";
import { ref, inject } from "vue";
import { showNotification } from "../utils/notifications";

const props = defineProps<{
  video_id: string;
  code: string;
}>();

const songList: any = inject("songList"); // Inject global songList state
const playSong: any = inject("playSong"); // Inject playSong function

const loading = ref(false);

const deleteSong = async () => {
  loading.value = true;

  try {
    // Fetch existing queue from Supabase
    const { data, error: fetchError } = await supabase
      .from("songs")
      .select("queue")
      .eq("code", props.code)
      .single();

    if (fetchError) throw fetchError;

    // Ensure queue is an array
    let existingQueue = Array.isArray(data?.queue) ? data.queue : [];

    // Remove the song with the matching video_id
    const updatedQueue = existingQueue.filter(
      (song) => song.video_id !== props.video_id
    );

    // Update the queue in Supabase
    const { error: updateError } = await supabase
      .from("songs")
      .update({ queue: updatedQueue })
      .eq("code", props.code);

    if (updateError) throw updateError;

    // Update local song list
    songList.value = updatedQueue;

    // Only play the next song if the currently playing song is deleted
    const currentPlayingVideoId = songList.value.length
      ? songList.value[0].video_id
      : null;

    if (props.video_id === currentPlayingVideoId) {
      playSong(0);
    }

    showNotification("Song removed", "success");
  } catch (error: any) {
    showNotification("Failed to remove song", "error");
  } finally {
    loading.value = false;
  }
};
</script>
