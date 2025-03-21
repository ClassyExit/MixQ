<template>
  <div
    class="w-full md:h-screen bg-base-200 flex flex-col space-y-4 md:space-y-0 p-4 md:flex-row md:justify-between space-x-0 md:space-x-4"
  >
    <div class="flex flex-col h-full md:w-8/12 rounded space-y-4">
      <div class="flex flex-row text-3xl items-center space-x-2">
        <router-link class="w-fit" :to="{ name: 'Home' }"> MixQ </router-link>
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
          <div v-else id="player" class="w-full h-full"></div>
        </div>
        <div
          v-if="currentSong"
          class="flex flex-row text-lg md:text-3xl lg:text-4xl items-center space-x-2 rounded shadow-md"
        >
          <img
            src="../assets/images/audio-visualizer.svg"
            alt="audio-visualizer"
            class="size-10 md:size-12 lg:size-14 scale-150 lg:scale-200 rounded-box flex items-center justify-center pl-4"
          />
          <div class="flex flex-col">
            <div>{{ currentSong.title }}</div>
            <div class="text-xs uppercase font-semibold opacity-60">
              {{ currentSong.duration }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="md:w-4/12 flex-1 flex flex-col space-y-4">
      <div class="h-96 md:h-1/2 bg-base-100 rounded">
        <div
          class="h-1/12 flex text-content-base items-center px-4 text-xs opacity-60 tracking-wide"
        >
          Queue ({{ songList.length }})
        </div>

        <ul class="h-11/12 list rounded-box shadow-md overflow-y-auto">
          <li v-if="!songList.length" class="p-4 text-xl">
            No songs in queue.
          </li>
          <li
            v-else
            v-for="(song, index) in songList"
            :key="song.video_id"
            class="list-row cursor-pointer"
            @click="playSong(index)"
          >
            <div>
              <img
                :class="
                  imgError
                    ? 'size-10 rounded-box bg-gray-400'
                    : 'size-10 rounded-box'
                "
                :src="song.thumbnail"
                alt="thumbnail"
                @error="handleImageError"
              />
            </div>
            <div class="flex flex-col">
              <div>{{ song.title }}</div>
              <div class="text-xs uppercase font-semibold opacity-60">
                {{ song.duration }}
              </div>
            </div>

            <delete_song_action
              :video_id="song.video_id"
              :code="roomId"
              @click.stop
            />
          </li>
        </ul>
      </div>
      <div class="md:h-1/2 bg-base-100 rounded p-4 space-y-4">
        <div class="flex flex-col space-y-2 text-base-content">
          <div class="text-2xl">Add songs to the queue</div>
          <div class="text-md">Room code: {{ roomId }}</div>
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
const roomLinkValue = `https://mixq-b6090.web.app/room/${roomId.value}`;
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
  return "h-[400px] sm:h-[400px] md:h-[400px] lg:h-[600px] xl:h-[800px] ";
});

// Queue - Initially Empty and fetch songs from DB
const songList: any = ref([]);
const currentVideoIndex = ref(0);

interface Song {
  video_id: string;
  title: string;
  duration: string;
  thumbnail: string;
}

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
      controls: 0, // No controls
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
        await removeCurrentSongFromQueue(); // Remove from UI but let it keep playing
      }
    }, 2000); // Small delay for safety
  }

  if (event.data === window.YT.PlayerState.ENDED) {
    // Only move to the next song when the current one has finished
    if (songList.value.length > 0) {
      playSong(0); // Play the next song in queue
    } else {
      player.stopVideo(); // Stop playback if queue is empty
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
