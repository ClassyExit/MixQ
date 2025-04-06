declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
  }

  namespace YT {
    interface Player {
      loadVideoById(videoId: string): void;
      getPlayerState(): number;
    }

    interface OnStateChangeEvent {
      data: number;
    }

    const PlayerState: {
      ENDED: number;
      PLAYING: number;
    };
  }

  interface Song {
    video_id: string;
    title: string;
    duration: string;
    thumbnail: string;
    imageError?: boolean | false;
  }
}

declare global {}
