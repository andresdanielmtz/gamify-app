import axios from "axios";

export const getGames = async () => {
  const url = '/igdb-covers'
  const response = await axios.get(url);
  return response.data;
};

export const sampleAPI = async () => {
  const response = await axios.get("https://api.sampleapis.com/coffee/hot")
  return response.data;
}