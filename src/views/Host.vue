<template>
  <div
    class="w-full md:h-screen bg-base-200 flex flex-col space-y-4 md:space-y-0 p-4 md:flex-row md:justify-between space-x-0 md:space-x-4"
  >
    <div class="flex flex-col h-full md:w-8/12 rounded space-y-4">
<<<<<<< HEAD
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
      </div>

      <div
        v-if="currentSong"
        class="flex flex-row text-lg items-center space-x-2 rounded shadow-md"
      >
        <div class="font-semibold">
          Current:
          <span class="text-primary"> {{ currentSong.title }}</span>
=======
      <router-link class="text-3xl w-fit" :to="{ name: 'Home' }">
        MixQ
      </router-link>

      <div class="bg-base-100 flex-1">
        <div :class="containerClass">
          <div id="player" class="w-full h-full"></div>
>>>>>>> origin/main
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
                v-if="song.thumbnail"
                class="size-10 rounded-box"
                :src="song.thumbnail"
                alt="thumbnail"
              />
              <div v-else class="size-10 rounded-box bg-gray-400"></div>
            </div>
            <div class="flex flex-col">
              <div>{{ song.title }}</div>
              <div class="text-xs uppercase font-semibold opacity-60">
                {{ song.duration }}
              </div>
            </div>

            <delete_song_action :video_id="song.video_id" :code="roomId" />
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
<<<<<<< HEAD
import { ref, onMounted, computed, provide, onUnmounted } from "vue";
=======
import { ref, onMounted, computed, provide } from "vue";
>>>>>>> origin/main
import { useRouter } from "vue-router";
import { supabase } from "../utils/supabase";
import QRCodeGenerator from "../components/QRCodeGenerator.vue";
import delete_song_action from "../components/delete_song_action.vue";

// Router setup
const router = useRouter();
const roomId = ref((router.currentRoute.value.params.id as string) || "");
const roomLinkValue = `https://mixq-b6090.web.app/room/${roomId}`;
<<<<<<< HEAD
let queueSubscription: any = null; // Store the channel reference

// YouTube Player
let player: any = null;
const showPlayer = ref(false);

const containerClass = computed(() => {
  return "h-[400px] sm:h-[400px] md:h-[400px] lg:h-[600px] xl:h-[800px] ";
});

// Queue - Initially Empty and fetch songs from DB
const songList: any = ref([]);
const currentVideoIndex = ref(0);

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
    console.error("Error fetching song queue:", error);
    return;
  }

  if (data && data.queue) {
    songList.value = Array.isArray(data.queue)
      ? data.queue
      : JSON.parse(data.queue);
  }
};

// **Subscribe to Realtime Updates**
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
        console.log("Queue updated!", payload.new.queue);
        songList.value = payload.new.queue;
      }
    )
    .subscribe();
};
// Load YouTube API
onMounted(async () => {
  await fetchSongs();
  subscribeToQueueUpdates();

=======

// YouTube Player
let player: any = null;

const containerClass = computed(() => {
  return "h-[400px] sm:h-[400px] md:h-[400px] lg:h-[600px] xl:h-[800px] ";
});

// Queue - Initially Empty and fetch songs from DB
const songList: any = ref([]);
const currentVideoIndex = ref(0);

// Provide songList & playSong globally
provide("songList", songList);
provide("playSong", (index: number) => playSong(index));

const fetchSongs = async () => {
  const { data, error } = await supabase
    .from("songs") // Ensure this matches your actual table name
    .select("queue") // Selecting the queue column
    .eq("code", roomId.value) // Filtering by room code
    .single(); // Expecting one row

  if (error) {
    console.error("Error fetching song queue:", error);
    return;
  }

  if (data && data.queue) {
    // Ensure `data.queue` is an array (not a string)
    if (typeof data.queue === "string") {
      try {
        songList.value = JSON.parse(data.queue); // If it's a string, parse it
      } catch (err) {
        console.error("Error parsing song queue:", err);
      }
    } else if (Array.isArray(data.queue)) {
      songList.value = data.queue; // If it's already an array, use it directly
    } else {
      console.error("Unexpected queue format:", data.queue);
    }
  }
};

// Load YouTube API
onMounted(async () => {
  await fetchSongs(); // Fetch songs first

>>>>>>> origin/main
  if (songList.value.length === 0) {
    console.warn(
      "No songs found in queue, YouTube player will not initialize."
    );
    return;
  }

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);

  window.onYouTubeIframeAPIReady = () => {
<<<<<<< HEAD
    initializePlayer();
  };
});

onUnmounted(() => {
  if (queueSubscription) {
    supabase.removeChannel(queueSubscription); // Pass the stored channel instance
  }
});

// Function to initialize player
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

=======
    player = new window.YT.Player("player", {
      height: "360",
      width: "640",
      videoId: songList.value[currentVideoIndex.value].video_id,
      playerVars: {
        autoplay: 1,
        controls: 1,
      },
      events: {
        onStateChange: onPlayerStateChange,
      },
    });
  };
});

>>>>>>> origin/main
// Function to Play Song from Queue
const playSong = (index: number) => {
  if (!songList.value.length || !songList.value[index]) {
    console.warn("No valid song found to play.");
    return;
  }

  currentVideoIndex.value = index;
  if (player) {
    player.loadVideoById(songList.value[index].video_id);
<<<<<<< HEAD
  } else {
    loadPlayer();
=======
>>>>>>> origin/main
  }
};

// Auto play and handle delete from queue
const onPlayerStateChange = async (event: any) => {
  if (event.data === window.YT.PlayerState.ENDED) {
    if (songList.value.length === 0) return;

<<<<<<< HEAD
    const playedSong = songList.value[0];

    try {
=======
    const playedSong = songList.value[0]; // Get the currently playing song

    try {
      // Fetch the current queue from Supabase
>>>>>>> origin/main
      let { data, error: fetchError } = await supabase
        .from("songs")
        .select("queue")
        .eq("code", roomId.value)
        .single();

      if (fetchError) throw fetchError;

<<<<<<< HEAD
=======
      // Filter out the played song from the queue
>>>>>>> origin/main
      const updatedQueue =
        data?.queue?.filter(
          (song: { video_id: string }) => song.video_id !== playedSong.video_id
        ) || [];

<<<<<<< HEAD
=======
      // Update the queue in Supabase
>>>>>>> origin/main
      const { error: updateError } = await supabase
        .from("songs")
        .update({ queue: updatedQueue })
        .eq("code", roomId.value);

      if (updateError) throw updateError;

<<<<<<< HEAD
      songList.value = updatedQueue;
      if (songList.value.length > 0) playSong(0);
=======
      console.log(`Song "${playedSong.title}" removed from queue.`);

      // Update local queue
      songList.value = updatedQueue;

      // Play next song (if available)
      if (songList.value.length > 0) {
        playSong(0);
      } else {
        console.warn("No more songs in the queue.");
      }
>>>>>>> origin/main
    } catch (error: any) {
      console.error("Error updating queue in DB:", error.message);
    }
  }
};
<<<<<<< HEAD

const currentSong = computed(
  () => songList.value[currentVideoIndex.value] || null
);
=======
>>>>>>> origin/main
</script>
