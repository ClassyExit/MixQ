<template>
  <div
    class="w-full md:h-screen bg-base-200 flex flex-col space-y-4 md:space-y-0 p-4 4xl:p-8 5xl:p-10 6xl:p-12 md:flex-row md:justify-between space-x-0 md:space-x-4"
  >
    <div
      class="flex flex-col h-full md:w-8/12 rounded space-y-4 4xl:space-y-8 5xl:space-y-16 6xl:space-y-20"
    >
      <div
        class="flex flex-row items-center text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-7xl 4xl:text-9xl items-start space-x-2 h-16 2xl:h-20 3xl:h-30 4xl:h-50 5xl:h-60 6xl:h-96"
      >
        <router-link
          class="w-fit flex space-x-4 items-center justify-center font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent xl:pr-8 4xl:pr-16 5xl:pr-20 6xl:pr-24 pb-4"
          :to="{ name: 'Home' }"
        >
          <img
            alt="Logo"
            class="h-16 2xl:h-20 3xl:h-30 4xl:h-50 5xl:h-60 6xl:h-96 rounded"
            src="../assets/logo-1.png"
          />
        </router-link>

        <transition name="slide-fade">
          <div
            v-if="queue.currentSong"
            class="flex flex-row items-center justify-center space-x-2 flex-1 h-full"
          >
            <img
              src="../assets/images/audio-visualizer.svg"
              alt="audio-visualizer"
              class="size-10 md:size-12 lg:size-14 3xl:size-18 4xl:size-22 5xl:size-28 6xl:size-32 scale-150 4xl:scale-200 rounded-box flex items-center justify-center pl-4"
            />
            <div class="flex flex-col">
              <div class="line-clamp-1">{{ queue.currentSong.title }}</div>
            </div>
          </div>
        </transition>
      </div>

      <div class="bg-base-200 flex-grow h-96 md:h-1/2 rounded">
        <div :class="containerClass" class="relative w-full h-full">
          <!-- Show thumbnail if the player hasn't loaded -->
          <div
            v-if="!showPlayer"
            class="w-full h-full cursor-pointer relative"
            @click="loadPlayer"
          >
            <button
              class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl w-full h-full"
            >
              ▶
            </button>
          </div>

          <!-- YouTube Player -->
          <div v-else class="relative w-full h-full overflow-hidden">
            <!-- Player container -->
            <div
              :class="queueStore.queue.showOverlay ? 'm-2' : ''"
              class="absolute inset-0 z-10 w-full h-full"
              id="player"
            ></div>

            <!-- Overlay container -->
            <div
              v-if="queueStore.queue.showOverlay"
              class="absolute inset-0 h-full w-full bg-white z-50 flex items-center justify-center"
              id="overlay"
            >
              <Overlay />
            </div>
          </div>
        </div>
      </div>

      <div
        class="controls flex flex-col gap-2"
        v-if="queueStore.queue.currentSong"
      >
        <div class="flex items-center justify-between px-4">
          <div
            class="flex items-center justify-start"
            @click="queueStore.toggleOverlay()"
          >
            <div v-if="queue.showOverlay">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="w-10 h-10 xl:w-16 xl:h-16 2xl:w-24 2xl:h-24 3xl:w-32 3xl:h-32 4xl:w-40 4xl:h-40 5xl:w-48 5xl:h-48 6xl:w-54 6xl:h-54"
              >
                <path
                  fill="currentColor"
                  d="M7 16h6q.425 0 .713-.288T14 15v-2.2l2.775 2.225q.375.3.8.1T18 14.45v-4.9q0-.475-.425-.675t-.8.1L14 11.2V9q0-.425-.288-.712T13 8H7q-.425 0-.712.288T6 9v6q0 .425.288.713T7 16m-3 4q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20z"
                />
              </svg>
            </div>

            <div v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="w-10 h-10 xl:w-16 xl:h-16 2xl:w-24 2xl:h-24 3xl:w-32 3xl:h-32 4xl:w-40 4xl:h-40 5xl:w-48 5xl:h-48 6xl:w-54 6xl:h-54"
              >
                <path
                  fill="currentColor"
                  d="M10.5 17q1.05 0 1.775-.725T13 14.5V9h3V7h-4v5.5q-.325-.225-.7-.363T10.5 12q-1.05 0-1.775.725T8 14.5t.725 1.775T10.5 17M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm0-2h16V6H4zm0 0V6z"
                />
              </svg>
            </div>
          </div>
          <div class="flex space-x-4 items-center justify-center">
            <button
              v-if="queueStore.queue.currentSong"
              @click="togglePlayPause"
              class="cursor-pointer"
            >
              <svg
                v-if="isPaused"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                class="w-10 h-10 xl:w-16 xl:h-16 2xl:w-24 2xl:h-24 3xl:w-32 3xl:h-32 4xl:w-40 4xl:h-40 5xl:w-48 5xl:h-48 6xl:w-54 6xl:h-54"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m9.5 16.5l7-4.5l-7-4.5zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                />
              </svg>

              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                class="w-10 h-10 xl:w-16 xl:h-16 2xl:w-24 2xl:h-24 3xl:w-32 3xl:h-32 4xl:w-40 4xl:h-40 5xl:w-48 5xl:h-48 6xl:w-54 6xl:h-54"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9 16h2V8H9zm4 0h2V8h-2zm-1 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                />
              </svg>
            </button>
            <button
              v-if="queueStore.queue.songList.length > 0"
              @click="skipSong"
              class="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="w-10 h-10 xl:w-16 xl:h-16 2xl:w-24 2xl:h-24 3xl:w-32 3xl:h-32 4xl:w-40 4xl:h-40 5xl:w-48 5xl:h-48 6xl:w-54 6xl:h-54"
              >
                <path
                  fill="currentColor"
                  d="M16.5 18V6h2v12zm-11 0V6l9 6zm2-3.75L10.9 12L7.5 9.75z"
                />
              </svg>
            </button>
          </div>

          <div class=""></div>
        </div>
        <div class="w-full px-4">
          <input
            type="range"
            min="0"
            :max="duration"
            step="1"
            v-model="currentTime"
            @input="seekTo"
            class="w-full bg-primary rounded-lg h-1 opacity-80 cursor-pointer"
          />
        </div>
      </div>
    </div>

    <div class="md:w-4/12 flex-1 flex flex-col space-y-4">
      <div class="h-96 md:h-1/2 bg-base-100 rounded">
        <div
          class="h-1/12 flex text-content-base items-center text-md lg:text-md xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-4xl 5xl:text-6xl 6xl:text-8xl px-4 opacity-60 tracking-wide space-x-1"
        >
          <span>Queue</span>
          <span
            class="flex items-center justify-between w-full space-x-1 lg:space-x-2"
          >
            <div class="flex flex-row items-center space-x-2">
              <div class="">({{ queue.songList.length }})</div>
            </div>

            <div class="">{{ queueStore.runTime }}</div>
          </span>
        </div>

        <ul
          class="h-11/12 list rounded-box shadow-md overflow-y-auto no-scrollbar"
        >
          <li
            v-if="!queue.songList.length"
            class="p-4 text-lg xl:text-lg 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-6xl 6xl:text-8xl"
          >
            No songs in queue.
          </li>

          <transition-group name="slide">
            <li
              v-for="(song, index) in queue.songList"
              :key="song.video_id"
              class="list-row cursor-pointer 4xl:space-y-4 5xl:space-y-6 6xl:space-y-8"
              @click="playSong(index)"
            >
              <div>
                <img
                  :key="song.thumbnail"
                  :class="
                    song.imageError
                      ? 'size-10 xl:size-14 2xl:size-18 3xl:size-24 4xl:size-36 5xl:size-42 6xl:size-72   rounded-box bg-gray-400'
                      : 'size-10 xl:size-14 2xl:size-18 3xl:size-24 4xl:size-36 5xl:size-42 6xl:size-72  rounded-box'
                  "
                  :src="encodeURI(song.thumbnail)"
                  alt="thumbnail"
                  @error="song.imageError = true"
                />
              </div>
              <div class="flex flex-col 4xl:space-y-2 6xl:space-y-4">
                <div
                  class="line-clamp-1 text-xs lg:text-xl xl:text-lg 2xl:text-2xl 3xl:text-3xl 4xl:text-6xl 5xl:text-7xl 6xl:text-8xl"
                >
                  {{ song.title }}
                </div>
                <div
                  class="text-xs lg:text-xs xl:text-md 2xl:text-lg 3xl:text-2xl 4xl:text-4xl 5xl:text-5xl 6xl:text-7xl uppercase font-semibold opacity-50"
                >
                  {{ song.duration }}
                </div>
              </div>

              <delete_song_action :video_id="song.video_id" @click.stop />
            </li>
          </transition-group>
        </ul>
      </div>
      <div class="md:h-1/2 bg-base-100 rounded p-4">
        <div
          class="flex flex-row items-center space-x-2 h-1/6 flex-col space-y-2 text-base-content"
        >
          <router-link
            :to="{ name: 'Room', params: { id: roomId } }"
            class="md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              class="h-6 w-6"
            >
              <path
                fill="currentColor"
                d="M3.5 2.5a1 1 0 0 0-1 1v.75a.75.75 0 0 1-1.5 0V3.5A2.5 2.5 0 0 1 3.5 1h.75a.75.75 0 0 1 0 1.5zm0 11a1 1 0 0 1-1-1v-.75a.75.75 0 0 0-1.5 0v.75A2.5 2.5 0 0 0 3.5 15h.75a.75.75 0 0 0 0-1.5zm10-10a1 1 0 0 0-1-1h-.75a.75.75 0 0 1 0-1.5h.75A2.5 2.5 0 0 1 15 3.5v.75a.75.75 0 0 1-1.5 0zm-1 10a1 1 0 0 0 1-1v-.75a.75.75 0 0 1 1.5 0v.75a2.5 2.5 0 0 1-2.5 2.5h-.75a.75.75 0 0 1 0-1.5zm-8-6.115V10a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V7.385a1 1 0 0 0-1-1h-.75l-.58-.92A1 1 0 0 0 8.323 5h-.648a1 1 0 0 0-.845.466l-.581.919H5.5a1 1 0 0 0-1 1M9 8.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
              />
            </svg>
          </router-link>
          <div
            class="flex flex-row space-x-2 text-lg lg:text-2xl xl:text-md 2xl:text-2xl 3xl:text-5xl 4xl:text-6xl 5xl:text-8xl 6xl:text-9xl"
          >
            <div class="">Room code:</div>
            <div class="text-secondary">{{ roomId }}</div>
          </div>

          <div
            class="text-xs lg:text-xs xl:text-lg 2xl:text-lg 3xl:text-4xl 4xl:text-5xl 5xl:text-7xl 6xl:text-8xl"
          ></div>
        </div>
        <div class="flex h-5/6 items-center justify-center">
          <QRCodeGenerator
            :value="roomLinkValue"
            :background="`#ffffff`"
            :foreground="`#000000`"
            :gradient="false"
            :gradientStartColor="`#000000`"
            :gradientEndColor="`#38bdf8`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import Overlay from "../components/Overlay.vue";

import QRCodeGenerator from "../components/QRCodeGenerator.vue";
import delete_song_action from "../components/delete_song_action.vue";
import { useQueueStore } from "../stores/queue";
import { storeToRefs } from "pinia";

const queueStore = useQueueStore();
const { queue } = storeToRefs(queueStore);

const router = useRouter();
const roomId = ref((router.currentRoute.value.params.id as string) || "");
useQueueStore().setHostRoom(roomId.value);
const roomLinkValue = `https://mixq.xyz/room/${roomId.value}`;

let player: any = null;
let playerReady = ref(false);
const showPlayer = ref(false);
const isYouTubeAPILoaded = ref(false);

const containerClass = computed(() => {
  return "h-[400px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[500px] 2xl:h-[700px] 3xl:h-[1000px] 4xl:h-[1400px] 5xl:h-[2000px] 6xl:h-[3000px] relative rounded-box shadow-md overflow-hidden";
});

const currentTime = ref(0);
const duration = ref(0);
let progressTimer: any = null;

const isPaused = ref(false);

const togglePlayPause = () => {
  if (!player) return;

  const playerState = player.getPlayerState();
  if (playerState === window.YT.PlayerState.PLAYING) {
    player.pauseVideo();
    isPaused.value = true;
  } else if (playerState === window.YT.PlayerState.PAUSED) {
    player.playVideo();
    isPaused.value = false;
  }
};

const playSong = (index: number) => {
  const song = queueStore.queue.songList[index];
  if (!song) return;

  queueStore.queue.currentVideoIndex = index;
  queueStore.queue.currentSong = song;

  if (player && playerReady) {
    player.loadVideoById(song.video_id);
    duration.value = player.getDuration();
    currentTime.value = 0;
    startProgressTimer();
  } else {
    loadPlayer();
  }
};

const skipSong = () => {
  if (queueStore.queue.songList.length > 0) {
    queueStore.removeCurrentSongFromQueue();
    currentTime.value = 0;
    playSong(0);
  } else {
    player.stopVideo();
    currentTime.value = 0;
    queueStore.removeCurrentSongFromQueue();
  }
};

onMounted(async () => {
  queueStore.fetchSongs(); // Fetch songs from the server
  queueStore.subscribeToQueueUpdates(); // Subscribe to queue updates
  showPlayer.value = true;
  await loadPlayer(); // Load the YouTube player
});

onUnmounted(() => {
  queueStore.unsubscribe(); // Unsubscribe from queue updates
});

const initializePlayer = () => {
  // Load the Youtube player to the DOM
  if (player || !window.YT || !window.YT.Player) return;

  // Only load the player if there is a song in the queue
  const song = queueStore.queue.songList[queueStore.queue.currentVideoIndex];
  if (!song) return;

  player = new window.YT.Player("player", {
    height: "360",
    width: "640",
    videoId: queueStore.queue.currentSong?.video_id,
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
    },
    events: {
      onReady: () => {
        playerReady.value = true;
        duration.value = player.getDuration();
        startProgressTimer();

        playSong(queueStore.queue.currentVideoIndex);
      },
      onStateChange: onPlayerStateChange,
    },
  });
};

const loadPlayer = async () => {
  // Handle loading the player

  await loadYouTubeAPI();
  initializePlayer();
};

const loadYouTubeAPI = () => {
  // Load the YouTube API and script
  if (window.YT && window.YT.Player) {
    isYouTubeAPILoaded.value = true;
    return;
  }

  if (isYouTubeAPILoaded.value) return; // Prevent loading multiple times

  return new Promise((resolve) => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      isYouTubeAPILoaded.value = true;
      resolve(true);
    };

    const checkAPI = () => {
      if (window.YT && window.YT.Player) {
        isYouTubeAPILoaded.value = true;
        resolve(true);
      } else {
        requestAnimationFrame(checkAPI);
      }
    };
    checkAPI();
  });
};

let alreadyRemoved = false;

// Handle YT player state changes
const onPlayerStateChange = async (event: any) => {
  if (event.data === window.YT.PlayerState.PLAYING) {
    // Dont process if already removed from queue
    if (!alreadyRemoved) {
      alreadyRemoved = true;

      // Update the current song in the queue
      queueStore.queue.currentSong =
        queueStore.queue.songList[queueStore.queue.currentVideoIndex] || null;

      setTimeout(async () => {
        if (player.getPlayerState() === window.YT.PlayerState.PLAYING) {
          await queueStore.removeCurrentSongFromQueue();
        }
      }, 1500);
    }
  }

  if (event.data === window.YT.PlayerState.ENDED) {
    alreadyRemoved = false; // Reset for next

    if (queueStore.queue.songList.length > 0) {
      playSong(0); // Next song
    } else {
      queueStore.queue.currentSong = null; // No song to play
      player.destroy(); // Destroy the player
      player = null; // Reset player
    }
  }
};

const startProgressTimer = () => {
  clearInterval(progressTimer);
  progressTimer = setInterval(() => {
    if (player && player.getCurrentTime) {
      currentTime.value = player.getCurrentTime();
      duration.value = player.getDuration();
    }
  }, 1000);
};

const seekTo = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const value = parseFloat(target.value);
  if (player && player.seekTo) {
    player.seekTo(value);
  }
};

watch(
  () => queueStore.queue.songList,
  (newQueue) => {
    if (newQueue.length > 0 && !queueStore.queue.currentSong) {
      playSong(0);
    }
  },
  { immediate: true } // This triggers the watcher on initial mount too
);
</script>

<style scoped>
/* Enter Animation */
.slide-enter-active {
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}

/* Leave Animation */
.slide-leave-active {
  transition: transform 0.3s ease-in, opacity 0.3s ease-in;
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-fade-enter-active {
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}
.slide-fade-enter-from {
  transform: translateX(-50px);
  opacity: 0;
}
.slide-fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-fade-leave-active {
  transition: transform 0.3s ease-in, opacity 0.3s ease-in;
}
.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-fade-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
