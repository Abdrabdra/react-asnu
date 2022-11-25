import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000",
});

export const $imageApi = "http://localhost:5000";
