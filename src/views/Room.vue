<template>
  <div class="w-full h-screen bg-base-200 flex justify-center px-4 py-6">
    <div class="flex flex-col space-y-6 max-w-5xl w-full">
      <div class="flex flex-row space-x-4 justify-between text-lg">
        <div
          class="flex items-center space-x-2 text-base-content cursor-pointer"
        >
          <span>ROOM</span>
        </div>
        <div class="text-secondary">{{ roomId }}</div>
      </div>

      <Search />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useQueueStore } from "../stores/queue";

import Search from "../components/Search.vue";

const router = useRouter();
const roomId = ref((router.currentRoute.value.params.id as string) || "");

useQueueStore().setHostRoom(roomId.value);
</script>
