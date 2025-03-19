<template>
  <div
    class="flex flex-col mt-4 md:flex-row items-center justify-center space-x-0 md:space-x-4"
  >
    <div v-if="isCreatingRoom" class="">
      <span class="loading text-primary loading-ring loading-md"></span>
      <div class="animate-pulse">Creating room...</div>
    </div>
    <button
      v-else
      @click="createHostRoom"
      class="btn btn-primary text-primary-content px-6 py-3 rounded-lg text-lg"
    >
      Host a Room
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { supabase } from "../utils/supabase";
import { useRouter } from "vue-router";

const router = useRouter();

function generateId(): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

const isCreatingRoom = ref(false);
let errorCreatingRoom = ref("Hello");

const createHostRoom = async () => {
  const roomId = generateId(); // Generate unique room ID
  isCreatingRoom.value = true;
  errorCreatingRoom.value = "";

  // Calculate expiration time (1 day from now)
  const expireAt = new Date();
  expireAt.setDate(expireAt.getDate() + 1); // Add 1 day

  // Insert room data into Supabase
  const { error } = await supabase.from("room").insert([
    {
      code: roomId,
      created_at: new Date().toISOString(),
      expire_at: expireAt.toISOString(), // Now expires after 1 day
      max_song_per_user: 5,
    },
  ]);

  if (error) {
    errorCreatingRoom.value = error.message;
    isCreatingRoom.value = false;
    return;
  }

  isCreatingRoom.value = false;

  // Redirect to host room page
  router.push({ name: "Host", params: { id: roomId } });
};
</script>
