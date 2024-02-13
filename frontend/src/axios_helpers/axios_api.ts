import axios from "axios";

export const axios_api_instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  headers: { Authorization: "ApiKey vladyslav:adsadsad21221323" },
});
