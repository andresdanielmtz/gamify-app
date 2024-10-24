import axios from "axios";

export const getGames = async () => {
  const url = '/api/igdb-covers'
  const response = await axios.get(url)
  console.log(response);
  return response.data;
};

export const sampleAPI = async () => {
  const response = await axios.get("https://api.sampleapis.com/coffee/hot")
  return response.data;
}