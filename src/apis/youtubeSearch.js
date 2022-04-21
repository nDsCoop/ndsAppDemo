import axios from "axios";

// put your api keys in .env file you can get those here - https://developers.google.com/youtube/v3/getting-started
export const selectRandomKey = () => {
  const keys = process.env.REACT_APP_YouTube_Keys.split(" "); //we are splitting the api keys to make an array
  const random = Math.floor(Math.random() * Math.floor(keys.length)); //this will get a random number
  return keys[random];
};

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
<<<<<<< HEAD
    videoCategoryId: "10",
=======
    videoCategoryId: "20",
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
    type: "video",
    key: selectRandomKey()
  }
});
