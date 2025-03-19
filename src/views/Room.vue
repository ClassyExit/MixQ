<template>
  <div class="bg-base-200 h-screen p-4 space-y-6">
    <div class="flex flex-row space-x-4 justify-between text-lg">
      <div
        @click="$router.go(-1)"
        class="flex items-center space-x-2 text-base-content cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M9.308 17.308L4 12l5.308-5.308l.708.708l-4.1 4.1H20v1H5.916l4.1 4.1z"
          />
        </svg>
        <span>ROOM</span>
      </div>
      <div class="text-primary-content">{{ roomId }}</div>
    </div>

    <div class="flex flex-col space-y-4">
      <div class="">Add Songs</div>
      <div
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
        <span> Add song </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const roomId = router.currentRoute.value.params.id;
</script>
