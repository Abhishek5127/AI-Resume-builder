import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const generateResume = async (data) => {
  const res = await API.post("/resume/generate", data);
  return res.data;
};
