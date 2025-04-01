<template>
  <div
    class="flex flex-col mt-4 md:flex-row items-center justify-center space-x-0 md:space-x-4"
  >
    <div v-if="isCreatingRoom">
      <span class="loading text-primary loading-ring loading-md"></span>
      <div class="animate-pulse">Creating room...</div>
    </div>

    <button
      v-else
      @click="createHostRoom"
      class="cursor-pointer btn btn-primary btn-xl hover:scale-105 transition-transform duration-300 text-xl 2xl:text-2xl 3xl:text-3xl shadow-lg"
    >
      Create Room 🎶
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { supabase } from "../utils/supabase";
import { useRouter } from "vue-router";
import { showNotification } from "../utils/notifications";

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

const createHostRoom = async () => {
  const roomId = generateId();
  isCreatingRoom.value = true;

  const expireAt = new Date();
  expireAt.setDate(expireAt.getDate() + 1); // Expires after 1 day

  try {
    // Create the host room
    const { error: roomError } = await supabase.from("room").insert([
      {
        code: roomId,
        created_at: new Date().toISOString(),
        expire_at: expireAt.toISOString(),
        max_song_per_user: 5,
      },
    ]);

    if (roomError) showNotification(roomError.message, "error", 3000);

    // Create songs queue for the room
    const { error: queueError } = await supabase.from("songs").insert([
      {
        code: roomId,
        queue: [],
        expire_at: expireAt.toISOString(),
      },
    ]);

    if (queueError) showNotification(queueError.message, "error", 3000);

    showNotification("Created room", "success", 3000);
    router.push({ name: "Host", params: { id: roomId } });
  } catch (error: any) {
    showNotification("Error creating room. Please try again", "error", 3000);
  } finally {
    isCreatingRoom.value = false;
  }
};
</script>
