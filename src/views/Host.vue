<template>
  <div
    class="w-full md:h-screen bg-base-200 flex flex-col space-y-4 md:space-y-0 p-4 md:flex-row md:justify-between space-x-0 md:space-x-4"
  >
    <div class="flex flex-col h-full md:w-8/12 rounded space-y-4">
      <router-link class="text-3xl w-fit" :to="{ name: 'Home' }">
        MixQ
      </router-link>

      <div class="bg-base-100 flex-1">
        <div :class="containerClass">
          <div id="player" class="w-full h-full"></div>
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
                class="size-10 rounded-box"
                :src="song.thumbnail"
                alt="thumbnail"
              />
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
import { ref, onMounted, computed, provide } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../utils/supabase";
import QRCodeGenerator from "../components/QRCodeGenerator.vue";
import delete_song_action from "../components/delete_song_action.vue";

// Router setup
const router = useRouter();
const roomId = ref((router.currentRoute.value.params.id as string) || "");
const roomLinkValue = `https://mixq-b6090.web.app/room/${roomId}`;

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

// Function to Play Song from Queue
const playSong = (index: number) => {
  if (!songList.value.length || !songList.value[index]) {
    console.warn("No valid song found to play.");
    return;
  }

  currentVideoIndex.value = index;
  if (player) {
    player.loadVideoById(songList.value[index].video_id);
  }
};

// Auto play and handle delete from queue
const onPlayerStateChange = async (event: any) => {
  if (event.data === window.YT.PlayerState.ENDED) {
    if (songList.value.length === 0) return;

    const playedSong = songList.value[0]; // Get the currently playing song

    try {
      // Fetch the current queue from Supabase
      let { data, error: fetchError } = await supabase
        .from("songs")
        .select("queue")
        .eq("code", roomId.value)
        .single();

      if (fetchError) throw fetchError;

      // Filter out the played song from the queue
      const updatedQueue =
        data?.queue?.filter(
          (song: { video_id: string }) => song.video_id !== playedSong.video_id
        ) || [];

      // Update the queue in Supabase
      const { error: updateError } = await supabase
        .from("songs")
        .update({ queue: updatedQueue })
        .eq("code", roomId.value);

      if (updateError) throw updateError;

      console.log(`Song "${playedSong.title}" removed from queue.`);

      // Update local queue
      songList.value = updatedQueue;

      // Play next song (if available)
      if (songList.value.length > 0) {
        playSong(0);
      } else {
        console.warn("No more songs in the queue.");
      }
    } catch (error: any) {
      console.error("Error updating queue in DB:", error.message);
    }
  }
};
</script>
