<template>
  <div
    class="bg-base-200 min-h-screen flex flex-col items-center p-4 landing-page"
  >
    <!-- Hero Section -->
    <section class="text-center space-y-4 py-16">
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
    <section
      class="w-full max-w-3xl mb-16 flex flex-col items-center space-y-6"
    >
      <div
        class="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6 w-full"
      >
        <CreateHostRoom />
        <span class="divider-horizontal text-xl font-bold">OR</span>
        <JoinRoom />
      </div>
    </section>

    <!-- Features -->
    <section class="mt-16 w-full 2xl:w-3/4 4xl:w-1/2 text-center">
      <div class="grid md:grid-cols-3 gap-8">
        <div
          class="card bg-base-100 shadow-lg p-6 rounded-xl hover:scale-105 transition-transform"
        >
          <h3 class="text-xl font-bold">Collaborative Playlists 🤝</h3>
          <p class="text-gray-400 mt-2">
            Everyone with the room code can contribute, making it great for
            parties, study sessions, or casual hangouts.
          </p>
        </div>
        <div
          class="card bg-base-100 shadow-lg p-6 rounded-xl hover:scale-105 transition-transform"
        >
          <h3 class="text-xl font-bold">Instant Room Access 🔗</h3>
          <p class="text-gray-400 mt-2">
            Join a room instantly by scanning a QR code or entering a code. No
            downloads or sign-ups required!
          </p>
        </div>
        <div
          class="card bg-base-100 shadow-lg p-6 rounded-xl hover:scale-105 transition-transform"
        >
          <h3 class="text-xl font-bold">Queue Management 📋</h3>
          <p class="text-gray-400 mt-2">
            Effortlessly add and remove songs in real time. The queue updates
            instantly for all listeners.
          </p>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section
      class="flex mt-16 w-full 2xl:w-3/4 4xl:w-1/2 flex flex-col items-center space-y-6"
    >
      <div class="order-2 py-6"></div>

      <div class="flex flex-col items-center text-center space-y-6">
        <h2 class="text-2xl font-semibold">Here's how it works</h2>

        <div class="flex flex-col items-center space-y-6">
          <!-- Step 1 -->
          <div class="flex flex-col items-center space-y-3">
            <div
              class="relative text-base-content text-2xl font-bold flex items-center justify-center"
            >
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                class="w-14 h-14 fill-primary"
              >
                <path
                  d="M50.6,-63.5C63.6,-51.6,70.5,-33.6,71.4,-17.5C72.4,-1.5,67.3,12.7,60,25.4C52.7,38.1,43.2,49.3,30.9,56.3C18.6,63.2,3.5,65.9,-12.5,68.2C-28.4,70.5,-45.2,72.4,-55.9,63.6C-66.6,54.9,-71.3,35.5,-72.4,17.4C-73.6,-0.6,-71.3,-17.3,-63.6,-29.6C-55.9,-41.8,-42.7,-49.5,-29.2,-60.1C-15.7,-70.8,0,-84.5,14.5,-82.5C29,-80.5,43.5,-62.4,50.6,-63.5Z"
                  transform="translate(100 100)"
                />
              </svg>

              <div class="absolute">1</div>
            </div>
            <h3 class="text-xl font-medium">Host or Join</h3>
            <p class="text-base-content opacity-70 max-w-md">
              You can either host your own room by clicking the
              <strong>"Create Room"</strong> button or join an existing room by
              entering the room code.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="flex flex-col items-center space-y-3">
            <div
              class="relative text-base-content text-2xl font-bold flex items-center justify-center"
            >
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                class="w-14 h-14 fill-secondary"
              >
                <path
                  d="M42.6,-65.8C54.2,-57.4,62.9,-45.6,67.4,-32.3C71.9,-18.9,72.2,-4,66.9,8.4C61.6,20.9,50.6,30.8,40.5,42.2C30.4,53.5,21.2,66.3,8.3,70.1C-4.7,74,-21.2,68.8,-34.4,60.1C-47.6,51.5,-57.5,39.5,-63.6,25.7C-69.6,11.8,-71.9,-4,-64.6,-15.9C-57.3,-27.7,-40.3,-35.6,-27.1,-44.3C-14,-52.9,-7,-62.2,4.6,-69.4C16.2,-76.6,32.4,-81.3,42.6,-65.8Z"
                  transform="translate(100 100)"
                />
              </svg>

              <div class="absolute">2</div>
            </div>
            <h3 class="text-xl font-medium">Scan the QR code</h3>
            <p class="text-base-content opacity-70 max-w-md">
              The QR code on the bottom right corner of the screen will take you
              to the search songs page, where you can search for songs to add to
              the queue.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="flex flex-col items-center space-y-3">
            <div
              class="relative text-base-content text-2xl font-bold flex items-center justify-center"
            >
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                class="w-14 h-14 fill-accent opacity-70"
              >
                <path
                  d="M36.3,-61.5C49.1,-52.4,62.1,-44.2,67.2,-32.3C72.4,-20.5,69.7,-4.9,64.2,8.9C58.7,22.6,50.3,34.4,39.3,44.5C28.4,54.5,14.2,62.8,0.2,62.6C-13.9,62.4,-27.8,53.6,-39.1,44.1C-50.5,34.6,-59.4,24.5,-63.2,12.3C-66.9,0.2,-65.5,-14,-60.3,-26.4C-55.1,-38.9,-46.1,-49.7,-35.2,-58.2C-24.3,-66.7,-12.1,-72.9,0.8,-74.3C13.8,-75.8,27.6,-72.1,36.3,-61.5Z"
                  transform="translate(100 100)"
                />
              </svg>
              <div class="absolute">3</div>
            </div>
            <h3 class="text-xl font-medium">You're all set!</h3>
            <img src="../assets/images/cover-art.png" alt="Cover Art" />
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section
      class="mt-0 md:mt-16 w-full text-xl 2xl:w-3/4 4xl:w-1/2 text-center space-y-2"
    >
      <h2 class="text-4xl font-bold mb-6">Frequently Asked Questions ❓</h2>
      <div class="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="faq" />
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
        <input type="radio" name="faq" />
        <div class="collapse-title font-semibold">
          How do I set it up? How do I connect it?
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
        <input type="radio" name="faq" />
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

<script setup>
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
