<template>
  <div class="bg-base-200">
    <!-- Hero Section -->
    <section
      class="flex flex-col items-center justify-center h-screen text-center p-6"
    >
      <h1 class="text-5xl font-bold mb-4">MixQ</h1>
      <p class="text-lg text-gray-300 max-w-xl">
        Host or join a room to share and discover music in real time. Find songs
        on your device and let the vibes flow.
      </p>

      <div
        class="flex flex-col mt-4 md:flex-row items-center justify-center space-x-0 md:space-x-4"
      >
        <CreateHostRoom />

        <div class="divider md:divider-horizontal py-4 px-4">OR</div>
        <div class="indicator">
          <div class="indicator-item indicator-bottom">
            <button class="btn btn-secondary">Join</button>
          </div>
          <div class="card border border-base-300 bg-base-100 shadow-sm">
            <div class="card-body">
              <h2 class="text-left text-white text-lg">Join a Room</h2>
              <input
                class="input w-full"
                v-model="roomCode"
                placeholder="Enter room code"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gray-800 text-center">
      <h2 class="text-3xl font-bold mb-6">How It Works</h2>
      <div class="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
        <div class="bg-gray-700 p-6 rounded-lg w-80">
          <h3 class="text-xl font-semibold">Host a Room</h3>
          <p class="text-gray-300 mt-2">
            Create a room and invite friends to share music in sync.
          </p>
        </div>
        <div class="bg-gray-700 p-6 rounded-lg w-80">
          <h3 class="text-xl font-semibold">Join a Room</h3>
          <p class="text-gray-300 mt-2">
            Enter a room code to instantly connect and enjoy shared tracks.
          </p>
        </div>
        <div class="bg-gray-700 p-6 rounded-lg w-80">
          <h3 class="text-xl font-semibold">Discover New Music</h3>
          <p class="text-gray-300 mt-2">
            Find new tracks and expand your playlist with collaborative
            listening.
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-6 text-center bg-gray-900">
      <p class="text-gray-400">&copy; 2025 MixQ. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { showNotification } from "../utils/notifications";

showNotification("Room created successfully!", "info", 3000);

import CreateHostRoom from "../components/CreateHostRoom.vue";

const roomCode = ref("");
</script>

<style scoped></style>
