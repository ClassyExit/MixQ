<template>
  <div class="w-full h-screen bg-base-200 flex justify-center px-4 py-6">
    <div class="flex flex-col space-y-6 max-w-5xl w-full">
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

      <Search />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";

import Search from "../components/Search.vue";

const router = useRouter();
const roomId = ref((router.currentRoute.value.params.id as string) || "");
</script>
