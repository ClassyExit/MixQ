<template>
  <div class="bg-base-200 mx-auto flex-1 min-h-screen p-6">
    <!-- Hero Section -->
    <section class="flex flex-col items-center justify-center text-center p-6">
      <h1 class="text-5xl font-bold mb-4">MixQ</h1>
      <p class="text-lg text-gray-300 max-w-xl">
        Host or join a room to share and discover music in real time. Find songs
        on your device and let the vibes flow.
      </p>
    </section>

    <div class="flex flex-col items-center justify-center p-6 space-y-4">
      <div class="flex flex-row space-x-2 items-center justify-center">
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Get Started
        </h1>
        <svg
          class="animate-bounce size-6 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 7v8.25L15.25 12l.75.66l-4.5 4.5l-4.5-4.5l.75-.66L11 15.25V7zm-.5 15C6.26 22 2 17.75 2 12.5A9.5 9.5 0 0 1 11.5 3a9.5 9.5 0 0 1 9.5 9.5a9.5 9.5 0 0 1-9.5 9.5m0-1a8.5 8.5 0 0 0 8.5-8.5A8.5 8.5 0 0 0 11.5 4A8.5 8.5 0 0 0 3 12.5a8.5 8.5 0 0 0 8.5 8.5"
          />
        </svg>
      </div>
      <div
        class="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-4"
      >
        <CreateHostRoom />

        <div class="divider md:divider-horizontal py-4 px-4">OR</div>

        <JoinRoom />
      </div>
    </div>

    <div class="flex flex-col items-center justify-center p-6 space-y-4">
      <div class="relative flex flex-col items-start space-y-10 pl-6">
        <!-- Vertical border -->
        <div class="absolute left-0 top-0 w-1 bg-primary h-full"></div>

        <!-- Timeline Item 1 -->
        <div class="relative flex items-center space-x-6">
          <!-- Dot -->
          <div
            class="absolute animate-ping -left-3 w-2 h-2 bg-primary rounded-full"
          ></div>
          <!-- Image -->
          <img
            src="../assets/images/QRCode.png"
            alt="QR Code"
            class="w-32 h-32 object-contain rounded-lg shadow-md"
          />
          <!-- Content -->
          <div>
            <h2 class="text-xl font-bold text-content-base">QR Code</h2>
            <p class="text-content-base text-left opacity-80 max-w-xl">
              Once you are in the room, you can scan the QR code to add songs to
              the queue!
            </p>
          </div>
        </div>

        <!-- Timeline Item 2 -->
        <div class="relative flex items-center space-x-6">
          <!-- Dot -->
          <div
            class="absolute animate-ping -left-3 w-2 h-2 bg-secondary rounded-full"
          ></div>
          <!-- Image -->
          <img
            src="../assets/images/Queue.png"
            alt="Queue Image"
            class="w-32 h-32 object-contain rounded-lg shadow-md"
          />
          <!-- Content -->
          <div>
            <h2 class="text-xl font-bold text-content-base">Queue</h2>
            <p class="text-content-base text-left opacity-80 max-w-xl">
              Your songs will show up in the queue and will autoplay once the
              song before it finishes.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <section class="py-16 text-center">
      <h2 class="text-3xl font-bold mb-6"></h2>
      <div class="flex flex-wrap justify-center gap-8 max-w-8xl mx-auto">
        <div class="card bg-base-100 w-96 shadow-sm">
          <div class="card-body">
            <h2 class="card-title">Collaborative Playlists 🤝</h2>
            <p class="text-base-content text-left opacity-80">
              Anyone with the room code can contribute to the queue, making it a
              perfect tool for parties, study sessions, or casual hangouts.
            </p>
          </div>
        </div>

        <div class="card bg-base-100 w-96 shadow-sm">
          <div class="card-body">
            <h2 class="card-title">Instant Room Access 🔗</h2>
            <p class="text-base-content text-left opacity-80">
              Joining a music session is easier than ever. Simply scan a QR code
              or enter a room code to start listening with others. No downloads
              or sign-ups required!
            </p>
          </div>
        </div>

        <div class="card bg-base-100 w-96 shadow-sm">
          <div class="card-body">
            <h2 class="card-title">Queue Management 📋</h2>
            <p class="text-base-content text-left opacity-80">
              Effortlessly add and remove in real time. The queue updates
              instantly for all listeners
            </p>
          </div>
        </div>
      </div>
    </section>

    <footer class="py-6 text-center">
      <p class="text-content-base">&copy; 2025 MixQ. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import CreateHostRoom from "../components/CreateHostRoom.vue";
import JoinRoom from "../components/JoinRoom.vue";
</script>

<style scoped></style>
