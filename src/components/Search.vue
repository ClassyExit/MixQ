<template>
  <div class="flex flex-col space-y-4">
    <button
      @click="openModal"
      class="bg-base-100 border border-primary flex flex-row space-x-2 p-2 justify-center rounded"
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
      <div class="">Add Songs...</div>
    </button>
  </div>

  <Teleport to="body">
    <dialog ref="music_modal" class="modal modal-bottom sm:modal-middle">
      <div
        class="modal-box rounded-lg shadow-lg sm:w-11/12 sm:max-w-5xl h-[91.67vh]"
      >
        <div class="flex justify-end">
          <button @click="closeModal" class="btn btn-sm btn-outline rounded">
            ✕
          </button>
        </div>
        <h3 class="text-lg text-center font-bold">Finds songs</h3>
        <div class="flex flex-row py-2 space-x-2">
          <input
            type="text"
            class="input input-bordered w-full"
            placeholder="Search for songs..."
          />
          <div class="btn btn-ghost bg-base-200">
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
          </div>
        </div>

        <div class="h-10/12 overflow-auto"></div>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";

const music_modal = ref<HTMLDialogElement | null>(null);

const openModal = () => music_modal.value?.showModal();
const closeModal = () => music_modal.value?.close();
</script>
