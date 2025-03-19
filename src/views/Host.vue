<template>
  <div
    class="w-full md:h-screen bg-base-200 flex flex-col space-y-4 md:space-y-0 p-4 md:flex-row md:justify-between space-x-0 md:space-x-4"
  >
    <div class="flex flex-col h-full md:w-8/12 rounded space-y-4">
      <router-link class="text-3xl" :to="{ name: 'Home' }"> MixQ </router-link>

      <div class="bg-base-100 flex-1">Audio player here</div>
    </div>

    <div class="md:w-4/12 flex-1 flex flex-col space-y-4">
      <div class="h-96 md:h-1/2 bg-base-100 rounded">
        <div
          class="h-1/12 flex text-content-base items-center px-4 text-xs opacity-60 tracking-wide"
        >
          Queue
        </div>

        <ul class="h-11/12 list rounded-box shadow-md overflow-y-auto">
          <li v-if="!songList.length" class="p-4 text-xl">
            No songs in queue. Visit the room page to add songs!
          </li>
          <li v-else v-for="song in songList" class="list-row">
            <div>
              <img
                class="size-10 rounded-box"
                src="https://img.daisyui.com/images/profile/demo/1@94.webp"
              />
            </div>
            <div>
              <div>{{ song.artist }}</div>
              <div class="text-xs uppercase font-semibold opacity-60">
                {{ song.title }}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="md:h-1/2 bg-base-100 rounded p-4 space-y-4">
        <div class="flex flex-col space-y-2 text-base-content">
          <div class="text-2xl">Add songs to the queue</div>
          <div class="text-md text-error">
            Visit "link" and enter room code: {{ roomId }}
          </div>
        </div>
        <div class="flex items-center justify-center">
          <QRCodeGenerator
            :value="roomLinkValue"
            :background="`#ffffff`"
            :foreground="`#000000`"
            :gradient="false"
            :gradientStartColor="`#000000`"
            :gradientEndColor="`#38bdf8`"
          />

          <div @click="moveToRoom" class="btn btn-primary">Manual</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import QRCodeGenerator from "../components/QRCodeGenerator.vue";
import AudioVisualizer from "../components/AudioVisualizer.vue";

const router = useRouter();
const roomId = router.currentRoute.value.params.id;

const moveToRoom = () => {
  router.push({ name: "Room", params: { id: roomId.toString() } });
};

const roomLinkValue = `https://mixq-b6090.web.app/room/${roomId}`;

const songList: any = ref([]);
// const songList = [
//   {
//     id: 1,
//     title: "Song 1",
//     artist: "Artist 1",
//     album: "Album 1",
//     duration: "3:45",
//   },
//   {
//     id: 2,
//     title: "Song 2",
//     artist: "Artist 2",
//     album: "Album 2",
//     duration: "4:20",
//   },
//   {
//     id: 3,
//     title: "Song 3",
//     artist: "Artist 3",
//     album: "Album 3",
//     duration: "2:30",
//   },
//   {
//     id: 4,
//     title: "Song 4",
//     artist: "Artist 4",
//     album: "Album 4",
//     duration: "3:15",
//   },
//   {
//     id: 5,
//     title: "Song 5",
//     artist: "Artist 5",
//     album: "Album 5",
//     duration: "3:00",
//   },
//   {
//     id: 6,
//     title: "Song 6",
//     artist: "Artist 6",
//     album: "Album 6",
//     duration: "4:00",
//   },
//   {
//     id: 7,
//     title: "Song 7",
//     artist: "Artist 7",
//     album: "Album 7",
//     duration: "3:30",
//   },
//   {
//     id: 8,
//     title: "Song 8",
//     artist: "Artist 8",
//     album: "Album 8",
//     duration: "2:45",
//   },
//   {
//     id: 9,
//     title: "Song 9",
//     artist: "Artist 9",
//     album: "Album 9",
//     duration: "3:00",
//   },
//   {
//     id: 10,
//     title: "Song 10",
//     artist: "Artist 10",
//     album: "Album 10",
//     duration: "3:45",
//   },
// ];
</script>
