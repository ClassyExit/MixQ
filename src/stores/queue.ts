import { defineStore } from "pinia";
import { supabase } from "../utils/supabase";
import { showNotification } from "../utils/notifications";

export const useQueueStore = defineStore("queue", {
  state: () => ({
    room: {
      id: null as string | null,
    },

    queue: {
      currentSong: null as Song | null,
      songList: [] as Song[],
      currentVideoIndex: 0,
    },
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
      this.room.id = code;
    },

    async fetchSongs() {
      const { data, error } = await supabase
        .from("songs")
        .select("queue")
        .eq("code", this.room.id)
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
      if (!this.room.id) {
        showNotification("No room ID set", "error");
        return;
      }

      try {
        // Fetch existing queue
        const { data, error: fetchError } = await supabase
          .from("songs")
          .select("queue")
          .eq("code", this.room.id)
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
          .eq("code", this.room.id);

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
      if (!this.room.id) {
        showNotification("No room ID set", "error");
        return;
      }

      try {
        // Fetch existing queue
        const { data, error: fetchError } = await supabase
          .from("songs")
          .select("queue")
          .eq("code", this.room.id)
          .maybeSingle();

        if (fetchError) {
          showNotification("Failed to fetch queue", "error");
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
          .eq("code", this.room.id);

        if (updateError) {
          showNotification("Failed to remove song", "error");
          return;
        }

        // Update local state
        this.queue.songList = updatedQueue;

        // Optional: play next song if current one was removed
        const currentPlayingId = this.queue.currentSong?.video_id ?? null;

        if (video_id === currentPlayingId && updatedQueue.length > 0) {
          this.queue.currentSong = updatedQueue[0];
          // Optional: trigger playback logic here if needed
        } else if (updatedQueue.length === 0) {
          this.queue.currentSong = null;
        }

        showNotification("Song removed", "success", 1500);
      } catch (error: any) {
        showNotification("Failed to remove song", "error", 1500);
      }
    },
  },
});
