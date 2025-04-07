import { defineStore } from "pinia";
import { supabase } from "../utils/supabase";
import { showNotification } from "../utils/notifications";

export const useQueueStore = defineStore("queue", {
  state: () => ({
    queue: {
      id: null as string | null, // Room ID
      currentSong: null as Song | null,
      songList: [] as Song[],
      currentVideoIndex: 0,
    },

    subscription: null as any,
  }),
  getters: {
    runTime(state): string {
      if (!state.queue.songList.length) return "0 mins";

      const totalSeconds = state.queue.songList.reduce((acc, song) => {
        const [minutes, seconds] = song.duration.split(":").map(Number);
        return acc + minutes * 60 + seconds;
      }, 0);

      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);

      return hours > 0 ? `${hours} hours, ${minutes} mins` : `${minutes} mins`;
    },
  },
  actions: {
    setHostRoom(code: string) {
      this.queue.id = code;
      this.queue.songList = []; // Reset song list
      this.queue.currentSong = null; // Reset current song
      this.queue.currentVideoIndex = 0; // Reset current video index
    },

    async fetchSongs() {
      const { data, error } = await supabase
        .from("songs")
        .select("queue")
        .eq("code", this.queue.id)
        .maybeSingle();

      if (error) {
        showNotification("Failed to get songs", "error");
        return;
      }

      if (data && data.queue) {
        this.queue.songList = Array.isArray(data.queue)
          ? data.queue
          : JSON.parse(data.queue);
      }
    },

    async addSong(song: Song) {
      if (!this.queue.id) {
        showNotification(
          "Unable to get room ID, please create a new room or rejoin. ",
          "error"
        );
        return;
      }

      try {
        // Fetch existing queue
        const { data, error: fetchError } = await supabase
          .from("songs")
          .select("queue")
          .eq("code", this.queue.id)
          .maybeSingle();

        if (fetchError) {
          showNotification("Failed to add song", "error");
          return;
        }

        let existingQueue = Array.isArray(data?.queue) ? data.queue : [];

        // Prevent duplicates
        if (existingQueue.some((s: Song) => s.video_id === song.video_id)) {
          showNotification("Song already in queue", "info");
          return;
        }

        // Append new song
        const updatedQueue = [...existingQueue, song];

        // Update in Supabase
        const { error: updateError } = await supabase
          .from("songs")
          .update({ queue: updatedQueue })
          .eq("code", this.queue.id);

        if (updateError) {
          showNotification("Failed to update queue", "error");
          return;
        }

        // Update local state
        this.queue.songList = updatedQueue;
        showNotification("Song added to queue", "success");
      } catch (error: any) {
        showNotification("Failed to add song", "error");
      }
    },

    async removeSong(video_id: string) {
      if (!this.queue.id) {
        showNotification("No room ID set", "error");
        return;
      }

      try {
        // Fetch existing queue
        const { data, error: fetchError } = await supabase
          .from("songs")
          .select("queue")
          .eq("code", this.queue.id)
          .maybeSingle();

        if (fetchError) {
          console.error("Error fetching queue:", fetchError);
          return;
        }

        let existingQueue = Array.isArray(data?.queue) ? data.queue : [];

        // Remove the song
        const updatedQueue = existingQueue.filter(
          (song: Song) => song.video_id !== video_id
        );

        // Update in Supabase
        const { error: updateError } = await supabase
          .from("songs")
          .update({ queue: updatedQueue })
          .eq("code", this.queue.id);

        if (updateError) {
          showNotification("Failed to remove song", "error");
          return;
        }

        // Update local state
        this.queue.songList = updatedQueue;

        showNotification("Song removed", "success", 1500);
      } catch (error: any) {
        showNotification("Failed to remove song", "error", 1500);
      }
    },

    async removeCurrentSongFromQueue() {
      try {
        let { data, error: fetchError } = await supabase
          .from("songs")
          .select("queue")
          .eq("code", this.queue.id)
          .single();

        if (fetchError) throw fetchError;

        const updatedQueue =
          data?.queue?.filter(
            (song: { video_id: string }) =>
              song.video_id !== this.queue.currentSong?.video_id
          ) || [];

        const { error: updateError } = await supabase
          .from("songs")
          .update({ queue: updatedQueue })
          .eq("code", this.queue.id);

        if (updateError) throw updateError;

        this.queue.songList = updatedQueue; // Update UI (removes from queue list)
      } catch (error: any) {
        console.error("Error updating queue in DB:", error.message);
      }
    },

    async subscribeToQueueUpdates() {
      if (this.subscription) {
        console.warn("Already subscribed to queue updates.");
        return;
      }

      this.subscription = supabase
        .channel("room-" + this.queue.id)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "songs",
            filter: `code=eq.${this.queue.id}`,
          },
          (payload) => {
            this.queue.songList = payload.new.queue || [];
          }
        )
        .subscribe();
    },

    async unsubscribe() {
      if (this.subscription) {
        await supabase.removeChannel(this.subscription);
        this.subscription = null;
      }
    },
  },
});
