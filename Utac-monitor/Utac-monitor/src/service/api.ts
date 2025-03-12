import axios from "axios";
import { ProJectInfo, rootProJectInfo } from "@/types/ProJectInfo";
import { API_config } from "@/constants/config";

const api = axios.create({
  baseURL: API_config.Base_URL,
  timeout: API_config.setTimeout,
});

export const ProJectInfoAPI = {
  getALL: () => api.get<rootProJectInfo>("/project"), // แก้เป็น "/project"
  getOne: (id: number) => api.get<ProJectInfo>(`/project/${id}`), // แก้เป็น "/project/${id}"
};
