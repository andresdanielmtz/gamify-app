import axios from "axios";

export const getGames = async () => {
  const url = "http://127.0.0.1:5000/igdb-proxy"
  const response = await axios.get(url)
  return response.data;
};


export const sampleAPI = async () => {
  const response = await axios.get("https://api.sampleapis.com/coffee/hot")
  return response.data;
}