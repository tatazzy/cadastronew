import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5093/swagger/index.html",
});
