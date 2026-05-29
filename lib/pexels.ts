
export const fetchPexelsImages = async (query: string = 'safari wildlife', perPage: number = 10) => {
  const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
  if (!apiKey) {
    console.error('Pexels API key is missing');
    return [];
  }

  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}`, {
      headers: {
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.photos;
  } catch (error) {
    console.error('Error fetching Pexels images:', error);
    return [];
  }
};
