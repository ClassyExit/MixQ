<template>
  <div>
    <div v-if="isCheckingRoom" class="">
      <span class="loading text-primary loading-ring loading-md"></span>
      <div class="animate-pulse">Finding room...</div>
    </div>

    <div v-else class="indicator">
      <div class="indicator-item indicator-bottom">
        <button
          @click="joinRoom()"
          class="btn btn-secondary hover:scale-105 transition-transform duration-300 text-lg 2xl:text-2xl 3xl:text-3xl px-4 py-4"
        >
          Join 🔗
        </button>
      </div>
      <div class="card border border-base-300 bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="text-left text-white text-xl 2xl:text-2xl 3xl:text-3xl">
            Join a Room
          </h2>
          <input
            class="input w-full"
            v-model="roomCode"
            placeholder="Enter room code"
            autofocus="false"
            tabindex="-1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { supabase } from "../utils/supabase";
import { showNotification } from "../utils/notifications";
import { useRouter } from "vue-router";

const router = useRouter();

const roomCode = ref("");

const isCheckingRoom = ref(false);

const joinRoom = async () => {
  if (!roomCode.value) return;

  isCheckingRoom.value = true;

  // Fetch room data from Supabase
  const { data, error } = await supabase
    .from("room")
    .select()
    .eq("code", roomCode.value.trim())
    .maybeSingle();

  if (error || !data) {
    showNotification(
      `No room found with room code: ${roomCode.value}`,
      "error",
      3000
    );
    isCheckingRoom.value = false;
    return;
  }

  isCheckingRoom.value = false;
  // Redirect to host room
  router.push({ name: "Host", params: { id: data.code } });
};
</script>
