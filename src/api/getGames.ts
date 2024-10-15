import axios from "axios";

export const getGames = async () => {
  const body = 'fields name,category,platforms;\nwhere category = 0 & platforms = 48;\nsort rating desc;\nlimit 30;';
  const url = "https://api.igdb.com/v4/games";
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: url,
    headers: { 
      'Client-ID': "wfqnh58yb7qmraadg28o0xuv970w2q",
      'Authorization': `Bearer 8zm5ffdlpq6a2dcv0kw88hpc84ieis`,
      'Content-Type': 'text/plain'
    },
    data: body
  };

  try {
    const response = await axios(config).then((response) => {
      console.log(response.data);
    }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};


export const sampleAPI = async () => {
  const response = await axios.get("https://api.sampleapis.com/coffee/hot")
  return response.data;
}