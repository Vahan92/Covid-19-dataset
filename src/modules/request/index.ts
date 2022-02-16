import axios from "axios";

export const client = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  // baseURL: "https://itunes.apple.com/us/rss/",
});