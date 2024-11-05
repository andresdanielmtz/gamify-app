import axios from "axios";
import { GameFilterParams } from "../types";

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
    limit: 450,
  };
  const queryParams = { ...defaultParams, ...params };
  const offset = (queryParams.page ? queryParams.page - 1 : 0) * (queryParams.limit || 30);
  let url = `/api/igdb-proxy?category=${queryParams.category}&sort_by=${queryParams.sort_by}&limit=${queryParams.limit}&offset=${offset}`;

  // Common platform IDs in IGDB:
  // 6 - PC (Microsoft Windows)
  // 48 - PlayStation 4
  // 49 - Xbox One
  // 130 - Nintendo Switch
  // 167 - PlayStation 5
  // 169 - Xbox Series X|S

  if (queryParams.platforms !== undefined) {
    url += `&platforms=(${queryParams.platforms})`;
  }
  if (queryParams.platforms == -1) {
    url = url.replace("&platforms=(-1)", "&platforms=(6,48,49,130,167,169)"); // Modern platforms
    console.log("All modern platforms");
    queryParams.limit = 600;
  }
  
  console.log(`url: ${url}`);
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

