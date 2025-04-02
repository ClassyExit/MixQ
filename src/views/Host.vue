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
            v-if="currentSong"
            class="flex flex-row items-center justify-center space-x-2 flex-1 h-full"
          >
            <img
              src="../assets/images/audio-visualizer.svg"
              alt="audio-visualizer"
              class="size-10 md:size-12 lg:size-14 3xl:size-18 4xl:size-22 5xl:size-28 6xl:size-32 scale-150 4xl:scale-200 rounded-box flex items-center justify-center pl-4"
            />
            <div class="flex flex-col">
              <div class="line-clamp-1">{{ currentSong.title }}</div>
            </div>
          </div>
        </transition>
      </div>

      <div class="bg-base-200 flex-1">
        <div :class="containerClass">
          <!-- Show thumbnail if the player hasn't loaded -->
          <div
            v-if="!showPlayer"
            class="relative w-full h-full cursor-pointer"
            @click="loadPlayer"
          >
            <button
              class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl"
            >
              ▶
            </button>
          </div>

          <!-- YouTube Player -->
          <div v-else id="player" class="w-full h-full overflow-hidden"></div>
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
            v-if="songList.length"
            class="flex items-center justify-between w-full space-x-1 lg:space-x-2"
          >
            <div class="px-2">({{ songList.length }})</div>

            <div class="">{{ runTime }}</div>
          </span>
        </div>

        <ul
          class="h-11/12 list rounded-box shadow-md overflow-y-auto no-scrollbar"
        >
          <li
            v-if="!songList.length"
            class="p-4 text-lg xl:text-lg 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-6xl 6xl:text-8xl"
          >
            No songs in queue.
          </li>

          <transition-group name="slide">
            <li
              v-for="(song, index) in songList"
              :key="song.video_id"
              class="list-row cursor-pointer 4xl:space-y-4 5xl:space-y-6 6xl:space-y-8"
              @click="playSong(index)"
            >
              <div>
                <img
                  :key="song.thumbnail"
                  :class="
                    imgError
                      ? 'size-10 xl:size-14 2xl:size-18 3xl:size-24 4xl:size-36 5xl:size-42 6xl:size-72   rounded-box bg-gray-400'
                      : 'size-10 xl:size-14 2xl:size-18 3xl:size-24 4xl:size-36 5xl:size-42 6xl:size-72  rounded-box'
                  "
                  :src="encodeURI(song.thumbnail)"
                  alt="thumbnail"
                  @error="handleImageError"
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

              <delete_song_action
                :video_id="song.video_id"
                :code="roomId"
                @click.stop
              />
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
import { ref, onMounted, computed, provide, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../utils/supabase";
import QRCodeGenerator from "../components/QRCodeGenerator.vue";
import delete_song_action from "../components/delete_song_action.vue";
import { showNotification } from "../utils/notifications";

// Router setup
const router = useRouter();
const roomId = ref((router.currentRoute.value.params.id as string) || "");
const roomLinkValue = `https://mixq.xyz/room/${roomId.value}`;
let queueSubscription: any = null; // Store the channel reference

// Image Error Handling
const imgError = ref(false);

const handleImageError = (event: any) => {
  imgError.value = true; // Apply error state
  event.target.src = ""; // Hide broken image
};

// YouTube Player
let player: any = null;
const showPlayer = ref(false);
const isYouTubeAPILoaded = ref(false); // Track if API has loaded

const containerClass = computed(() => {
  return "h-[400px] sm:h-[400px] md:h-[450px] lg:h-[550px] xl:h-[550px] 2xl:h-[700px] 3xl:h-[1000px] 4xl:h-[1400px] 5xl:h-[2000px] 6xl:h-[3000px] relative rounded-box shadow-md overflow-hidden";
});

const runTime = computed(() => {
  if (!songList.value.length) return "0 mins";

  const totalSeconds = songList.value.reduce(
    (acc: number, song: { duration: string }) => {
      const [minutes, seconds] = song.duration.split(":").map(Number);
      return acc + minutes * 60 + seconds;
    },
    0
  );

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return hours > 0 ? `${hours} hours, ${minutes} mins` : `${minutes} mins`;
});

// Queue - Initially Empty and fetch songs from DB
const songList: any = ref([]);
const currentVideoIndex = ref(0);
const currentSong = ref<Song | null>(null);

// Provide songList & playSong globally
provide("songList", songList);
provide("playSong", (index: number) => playSong(index));

const fetchSongs = async () => {
  const { data, error } = await supabase
    .from("songs")
    .select("queue")
    .eq("code", roomId.value)
    .maybeSingle();

  if (error) {
    showNotification("Failed to get songs", "error");
    return;
  }

  if (data && data.queue) {
    songList.value = Array.isArray(data.queue)
      ? data.queue
      : JSON.parse(data.queue);
  }
};

// Subscribe to Realtime Updates
const subscribeToQueueUpdates = () => {
  queueSubscription = supabase
    .channel(`room-queue-updates-${roomId.value}`) // Store reference
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "songs",
        filter: `code=eq.${roomId.value}`,
      },
      (payload) => {
        // console.log("Queue updated!", payload.new.queue);
        songList.value = payload.new.queue;
      }
    )
    .subscribe();
};

const loadYouTubeAPI = () => {
  if (window.YT && window.YT.Player) {
    isYouTubeAPILoaded.value = true;
    return;
  }

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);

  window.onYouTubeIframeAPIReady = () => {
    isYouTubeAPILoaded.value = true;
  };
};

// Function to wait for YouTube API
const waitForYouTubeAPI = () => {
  if (window.YT && window.YT.Player) return Promise.resolve(true);

  return new Promise((resolve) => {
    const checkAPI = () => {
      if (window.YT && window.YT.Player) {
        resolve(true);
      } else {
        requestAnimationFrame(checkAPI);
      }
    };
    checkAPI();
  });
};

// Load YouTube API and fetch songs
onMounted(async () => {
  loadYouTubeAPI(); // Start loading YouTube API
  await fetchSongs();
  subscribeToQueueUpdates();

  showPlayer.value = true;
  if (!isYouTubeAPILoaded.value) await waitForYouTubeAPI();
  initializePlayer();
});

onUnmounted(() => {
  if (queueSubscription) {
    supabase.removeChannel(queueSubscription); // Pass the stored channel instance
  }
});

// Watch for changes in the song queue
watch(songList, async (newList) => {
  console.log("Watching, songList", songList.value.length);
  if (newList.length > 0 && !player) {
    showPlayer.value = true; // Show the player UI

    // Ensure YouTube API is loaded before initializing the player
    if (!isYouTubeAPILoaded.value) {
      console.warn("YouTube API not yet loaded. Waiting...");
      await waitForYouTubeAPI(); // Wait before initializing
    }

    initializePlayer();
  }
});

// Function to initialize yt player
const initializePlayer = () => {
  player = new window.YT.Player("player", {
    height: "360",
    width: "640",
    videoId: songList.value[currentVideoIndex.value].video_id,
    playerVars: {
      autoplay: 1,
      controls: 1, // No controls
      modestbranding: 1, // Hide YouTube branding
      rel: 0, // Prevent related videos
      showinfo: 0, // Hide video info
      iv_load_policy: 3, // Hide annotations
    },
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
};

// Function to show player when thumbnail is clicked
const loadPlayer = () => {
  showPlayer.value = true;
  setTimeout(() => {
    initializePlayer();
  }, 500);
};

// Function to Play Song from Queue
const playSong = (index: number) => {
  if (!songList.value.length || !songList.value[index]) {
    console.warn("No valid song found to play.");
    return;
  }

  currentVideoIndex.value = index;
  if (player) {
    player.loadVideoById(songList.value[index].video_id);
  } else {
    loadPlayer();
  }
};

// Auto play and handle delete from queue
const onPlayerStateChange = async (event: any) => {
  if (event.data === window.YT.PlayerState.PLAYING) {
    // Set the current song BEFORE removing it from the queue
    currentSong.value = songList.value[currentVideoIndex.value];

    // Remove current song from queue, but let it play fully
    setTimeout(async () => {
      if (player.getPlayerState() === window.YT.PlayerState.PLAYING) {
        await removeCurrentSongFromQueue(); // Remove from queue but let it keep playing
      }
    }, 1500);
  }

  if (event.data === window.YT.PlayerState.ENDED) {
    // Only move to the next song when the current one has finished
    if (songList.value.length > 0) {
      playSong(0); // Play the next song in queue
    } else {
      // Nothing else to play, reset all players
      player.stopVideo();
      player = null;
      showPlayer.value = false;
      isYouTubeAPILoaded.value = false;
    }
  }
};

const removeCurrentSongFromQueue = async () => {
  try {
    let { data, error: fetchError } = await supabase
      .from("songs")
      .select("queue")
      .eq("code", roomId.value)
      .single();

    if (fetchError) throw fetchError;

    const updatedQueue =
      data?.queue?.filter(
        (song: { video_id: string }) =>
          song.video_id !== currentSong.value?.video_id
      ) || [];

    const { error: updateError } = await supabase
      .from("songs")
      .update({ queue: updatedQueue })
      .eq("code", roomId.value);

    if (updateError) throw updateError;

    songList.value = updatedQueue; // Update UI (removes from queue list)
  } catch (error: any) {
    console.error("Error updating queue in DB:", error.message);
  }
};
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
