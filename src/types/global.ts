declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
  }

  interface Song {
    video_id: string;
    title: string;
    duration: string;
    thumbnail: string;
  }

  interface Song {
    video_id: string;
    title: string;
    duration: string;
    thumbnail: string;
    imageError?: boolean | false;
  }
}
