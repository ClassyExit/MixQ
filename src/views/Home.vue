<template>
  <div
    class="bg-base-200 min-h-screen flex flex-col items-center p-4 landing-page"
  >
    <div class="flex w-full">
      <img
        alt="Logo"
        class="h-16 2xl:h-20 3xl:h-30 4xl:h-50 5xl:h-60 6xl:h-96 rounded"
        src="../assets/logo-1.png"
      />
    </div>
    <!-- Hero Section -->
    <section class="text-center space-y-4 py-12">
      <h1
        class="text-6xl 2xl:text-7xl 3xl:text-9xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
      >
        MixQ
      </h1>
      <p class="text-lg 2xl:text-2xl text-gray-300 max-w-2xl mx-auto">
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

    <!-- Features Section -->
    <section class="mt-16 w-full 2xl:w-3/4 4xl:w-1/2 text-center">
      <h2
        class="text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-8xl font-bold mb-10"
      >
        Why Choose MixQ?
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="card bg-base-100 shadow-lg p-6 rounded-xl">
          <h3
            class="text-xl 2xl:text-3xl 4xl:text-4xl 5xl:text-5xl 6xl:text-6xl font-bold"
          >
            Collaborative Playlists 🤝
          </h3>
          <p
            class="text-gray-400 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl 6xl:text-5xl mt-2"
          >
            Everyone with the room code can contribute, making it great for
            parties, study sessions, or casual hangouts.
          </p>
        </div>
        <div class="card bg-base-100 shadow-lg p-6 rounded-xl">
          <h3
            class="text-xl 2xl:text-3xl 4xl:text-4xl 5xl:text-5xl 6xl:text-6xl font-bold"
          >
            Instant Room Access 🔗
          </h3>
          <p
            class="text-gray-400 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl 6xl:text-5xl mt-2"
          >
            Join a room instantly by scanning a QR code or entering a code. No
            downloads or sign-ups required!
          </p>
        </div>
        <div class="card bg-base-100 shadow-lg p-6 rounded-xl">
          <h3
            class="text-xl 2xl:text-3xl 4xl:text-4xl 5xl:text-5xl 6xl:text-6xl font-bold"
          >
            Queue Management 📋
          </h3>
          <p
            class="text-gray-400 2xl:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl 6xl:text-5xl mt-2"
          >
            Effortlessly add and remove songs in real time. The queue updates
            instantly for all listeners.
          </p>
        </div>
      </div>
    </section>

    <section
      class="mt-16 w-full text-xl 2xl:w-3/4 4xl:w-1/2 text-center space-y-2"
    >
      <div class="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" checked:false="checked" />
        <div class="collapse-title font-semibold">
          What is MixQ and how do I use it?
        </div>
        <div class="collapse-content text-sm">
          <p>
            MixQ is a web app that features a shared music queue, ideal for
            parties or study sessions. Multiple users can add songs to a queue
            for everyone to enjoy. To get started, create a room using the
            "Create Room" button or join an existing room by entering the room
            code displayed in an active session.
          </p>
        </div>
      </div>
      <div class="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div class="collapse-title font-semibold">
          How does it work? How do I connect?
        </div>
        <div class="collapse-content text-sm">
          <p>
            For the best experience, set this up on a central device like a TV
            where everyone can see the queue. Use a laptop, tablet, or any
            compatible device connected to the TV via HDMI, display cables, or
            casting methods.
          </p>
        </div>
      </div>
      <div class="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div class="collapse-title font-semibold">
          How do I connect my music?
        </div>
        <div class="collapse-content text-sm">
          <p>
            MixQ integrates with YouTube and plays songs through an embedded
            YouTube player. To add music, scan the QR code with your phone and
            search for songs you want to queue up!
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
