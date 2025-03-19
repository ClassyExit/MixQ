// api/search.ts
export async function searchMusicAPI(query: string) {
  const urls = [
    `https://tmdb-backend.herokuapp.com/api/song/search?q=${encodeURIComponent(
      query
    )}`,
    `https://tmdb-backend.autoidleapp.com/api/song/search?q=${encodeURIComponent(
      query
    )}`,
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error(`Fetch error: ${error} on ${url}`);
    }
  }

  return []; // Return empty array if all requests fail
}
