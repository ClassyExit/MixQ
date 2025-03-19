<template>
  <div class="flex flex-col space-y-4">
    <button
      @click="openModal"
      class="bg-base-100 border border-primary flex items-center space-x-2 p-2 justify-center rounded"
      aria-label="Add Songs"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M11.5 16.5h1v-4h4v-1h-4v-4h-1v4h-4v1h4zm.503 4.5q-1.867 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
        />
      </svg>
      <div>Add Songs...</div>
    </button>
  </div>

  <Teleport to="body">
    <dialog ref="music_modal" class="modal modal-bottom sm:modal-middle">
      <div
        class="modal-box rounded-lg shadow-lg sm:w-11/12 sm:max-w-5xl h-[91.67vh]"
      >
        <div class="flex justify-between">
          <h3 class="text-lg font-bold">Find songs</h3>
          <button
            @click="closeModal"
            class="btn btn-xs btn-outline rounded"
            aria-label="Close Modal"
          >
            ✕
          </button>
        </div>

        <div class="flex flex-row py-2 space-x-2">
          <input
            v-model="searchQuery"
            type="text"
            class="input input-bordered w-full"
            placeholder="Search for songs..."
          />
          <button
            @click="searchMusic"
            :disabled="loading"
            class="p-2 rounded-lg flex items-center justify-center bg-base-200"
            :class="{ 'opacity-50 cursor-not-allowed': loading }"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
              />
            </svg>
          </button>
        </div>

        <div class="h-5/6 overflow-auto">
          <ul v-if="searchResults.length">
            <li
              v-for="song in searchResults"
              :key="song.video_id"
              class="p-2 border-b flex flex-row items-center space-x-2"
            >
              <img
                :src="song.thumbnail"
                class="rounded-lg h-8 w-8"
                alt="Song Thumbnail"
              />
              <div class="truncate">{{ song.title }}</div>

              <add_song_action
                :video_id="song.video_id"
                :title="song.title"
                :thumbnail="song.thumbnail"
                :duration="song.duration"
                :code="roomId"
              />
            </li>
          </ul>
          <p v-else-if="loading" class="text-center text-gray-500">
            Searching...
          </p>
          <p v-else class="text-center text-gray-500">No results found.</p>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import add_song_action from "./add_song_action.vue";
import { searchMusicAPI } from "../api/search"; // Move API logic to a separate file
import { useRouter } from "vue-router";

const router = useRouter();
const roomId = ref((router.currentRoute.value.params.id as string) || "");

const music_modal = ref<HTMLDialogElement | null>(null);
const searchQuery = ref("");
const searchResults = ref<
  {
    video_id: string;
    title: string;
    thumbnail: string;
    duration: string;
  }[]
>([]);
const loading = ref(false);

const openModal = () => music_modal.value?.showModal();
const closeModal = () => {
  music_modal.value?.close();
  searchResults.value = [];
  searchQuery.value = ""; // Clear search input on modal close
};

const searchMusic = async () => {
  if (!searchQuery.value.trim()) return;

  loading.value = true;
  searchResults.value = [];

  try {
    const results = await searchMusicAPI(searchQuery.value);
    searchResults.value = results || [];
  } catch (error) {
    console.error("Search failed:", error);
    searchResults.value = []; // Ensure state resets on failure
  } finally {
    loading.value = false;
  }
};
</script>
