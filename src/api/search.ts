import YTMusic from "ytmusic-api";

// Corrected async search function
export async function search(query: string) {
  try {
    if (!query) return [];

    // Initialize YTMusic instance
    const ytmusic = new YTMusic();
    await ytmusic.initialize();

    // Perform search
    const songs = await ytmusic.search(query);

    // Filter to only include "SONG" types and map the result to a simplified structure
    const results = songs
      .filter((result) => result.type === "SONG") // Filter only songs
      .map((result) => ({
        video_id: result.videoId, // Access videoId only for SONG type
        title: `${result.artist.name} - ${result.name}`,
      }));

    return results; // Return the formatted results
  } catch (error) {
    console.error("Search error:", error);
    return []; // Return an empty array on error
  }
}
