<template>
  <div
    class="bg-base-200 min-h-screen flex flex-col items-center p-6 landing-page"
  >
    <!-- Hero Section -->
    <section class="text-center space-y-4 py-12">
      <h1
        class="text-6xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
      >
        MixQ
      </h1>
      <p class="text-lg text-gray-300 max-w-2xl mx-auto">
        Host or join a room to share and discover music in real time. Find songs
        on your device and let the vibes flow. 👇
      </p>
    </section>

    <!-- Get Started Section -->
    <section class="w-full max-w-3xl flex flex-col items-center space-y-6">
      <div class="flex flex-col md:flex-row items-center justify-center gap-6">
        <CreateHostRoom />
        <span class="divider-horizontal text-xl font-bold">OR</span>
        <JoinRoom />
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="hidden w-full max-w-4xl mt-16 space-y-12">
      <div class="relative flex flex-col space-y-10">
        <!-- Timeline Line -->
        <div class="absolute left-4 top-0 h-full w-1 bg-primary"></div>

        <!-- QR Code Feature -->
        <div class="flex items-center space-x-6">
          <div class="relative w-6 h-6 bg-primary rounded-full -ml-3"></div>
          <img
            src="../assets/images/QRCode.png"
            alt="QR Code"
            class="hidden md:block w-32 h-32 rounded-lg shadow-lg"
          />
          <div>
            <h3 class="text-2xl font-semibold">QR Code</h3>
            <p class="text-gray-400 max-w-lg">
              Once you are in the room, scan the QR code to add songs to the
              queue effortlessly.
            </p>
          </div>
        </div>

        <!-- Queue Feature -->
        <div class="flex items-center space-x-6">
          <div class="relative w-6 h-6 bg-secondary rounded-full -ml-3"></div>
          <img
            src="../assets/images/Queue.png"
            alt="Queue"
            class="hidden md:block w-32 h-32 rounded-lg shadow-lg"
          />
          <div>
            <h3 class="text-2xl font-semibold">Queue</h3>
            <p class="text-gray-400 max-w-lg">
              Your songs will automatically play in sequence, ensuring a
              seamless listening experience.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="mt-16 w-full max-w-6xl text-center">
      <h2 class="text-4xl font-bold mb-10">Why Choose MixQ?</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="card bg-base-100 shadow-lg p-6 rounded-xl">
          <h3 class="text-xl font-bold">Collaborative Playlists 🤝</h3>
          <p class="text-gray-400 mt-2">
            Everyone with the room code can contribute, making it great for
            parties, study sessions, or casual hangouts.
          </p>
        </div>
        <div class="card bg-base-100 shadow-lg p-6 rounded-xl">
          <h3 class="text-xl font-bold">Instant Room Access 🔗</h3>
          <p class="text-gray-400 mt-2">
            Join a room instantly by scanning a QR code or entering a code. No
            downloads or sign-ups required!
          </p>
        </div>
        <div class="card bg-base-100 shadow-lg p-6 rounded-xl">
          <h3 class="text-xl font-bold">Queue Management 📋</h3>
          <p class="text-gray-400 mt-2">
            Effortlessly add and remove songs in real time. The queue updates
            instantly for all listeners.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import CreateHostRoom from "../components/CreateHostRoom.vue";
import JoinRoom from "../components/JoinRoom.vue";
</script>

<style scoped>
.card {
  transition: transform 0.3s ease-in-out;
}
.card:hover {
  transform: translateY(-5px);
}

.landing-page {
  background-image: url("@/assets/images/background.svg");
  background-size: cover;
  background-position: center;
}
</style>
