import axios from "axios";

interface GameFilterParams {
  search?: string;
  category?: number;
  platforms?: number;
  sort_by?: string;
  limit?: number;
}


export const getGames = async ({ search = "", ...params } = {}) => {
  const defaultParams: GameFilterParams = {
    category: 0,
    platforms: 48,
    sort_by: "rating desc",
    limit: 50,
  };

  const queryParams = { ...defaultParams, ...params };
  const url = `/api/igdb-covers?category=${queryParams.category}&platforms=${queryParams.platforms}&sort_by=${queryParams.sort_by}&limit=${queryParams.limit}&search=${queryParams.search || ''}`;

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
    category: 0,
    platforms: 48,
    sort_by: "rating desc",
    limit: 50,
  };

  const queryParams = { ...defaultParams, ...params };
  let url = `/api/igdb-covers?category=${queryParams.category}&sort_by=${queryParams.sort_by}&limit=${queryParams.limit}&search=${queryParams.search || ''}`;

  if (queryParams.platforms !== undefined) {
    url += `&platforms=${queryParams.platforms}`;
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


export const sampleAPI = async () => {
  const response = await axios.get("https://api.sampleapis.com/coffee/hot")
  return response.data;
}
