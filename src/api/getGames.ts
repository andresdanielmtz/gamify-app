import axios from "axios";

interface GameFilterParams {
  category?: number;
  platforms?: number;
  sort_by?: string;
  limit?: number;
  page?: number;
}

export const getGames = async ({ search = "", platforms = [], ...params } = {}) => {
  const defaultParams = {
    category: 1,
    platforms: [],
    sort_by: "rating desc",
    limit: 200,
  };
  const queryParams = {
    ...defaultParams,
    platforms: platforms.length > 0 ? platforms : [49], // Use [49] as default or provided platforms
    ...params,
  };

  // Join platforms into a comma-separated string
  const platformsString = queryParams.platforms.join(",");

  const url = `/api/igdb-covers?category=${queryParams.category}&platforms=${platformsString}&sort_by=${queryParams.sort_by}&limit=${queryParams.limit}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};

export const getGamesFiltered = async (params: GameFilterParams = {}) => {
  const defaultParams: GameFilterParams = {
    category: 1,
    platforms: 49,
    sort_by: "rating desc",
    limit: 100,
  };

  const queryParams = { ...defaultParams, ...params };
  const offset = (queryParams.page ? queryParams.page - 1 : 0) * (queryParams.limit || 50);
  let url = `/api/igdb-proxy?category=${queryParams.category}&sort_by=${queryParams.sort_by}&limit=${queryParams.limit}&offset=${offset}`;

  if (queryParams.platforms !== undefined) {
    url += `&platforms=${queryParams.platforms}`;
  }
  if (queryParams.platforms == -1) {
    url = url.replace(/&platforms=-1/, "&platforms=48,167,49,169,130,6");
    defaultParams.limit = 600;

  }
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};

export const getGameByName = async (name: string) => {
  try {
    const response = await axios.get(`/api/igdb-proxy/${name}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching game by name:", error);
    throw error;
  }
};

export const sampleAPI = async () => {
  const response = await axios.get("https://api.sampleapis.com/coffee/hot")
  return response.data;
}