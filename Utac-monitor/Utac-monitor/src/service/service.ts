import axios from "axios";

import { API_config } from "@/constants/config";
import { rootServiceInfo, ServiceInfo } from "@/types/ServiceInfo";

const api = axios.create({
  baseURL: API_config.Base_URL,
  timeout: API_config.setTimeout,
});

export const ServiceInfoAPI = {
  getALL: () => api.get<rootServiceInfo>("/Service"), // แก้เป็น "/Service"
  getOne: (id: string) => api.get<ServiceInfo>(`/Service/${id}`),
  update: (id: string,reqbody:ServiceInfo) => api.put<ServiceInfo>(`/Service/${id}`,reqbody),
  delete: (id: string) => api.delete<ServiceInfo>(`/Service/${id}`),
  refresh: (id: string) => api.post<ServiceInfo>(`/Service/Refresh/${id}`),
    // แก้เป็น "/Service/${id}"
};
