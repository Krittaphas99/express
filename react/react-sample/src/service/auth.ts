import axios from "axios";
import { API_config } from "@/constants/config";
import { res_authenLogin,req_authenLogin} from "@/types/auth_login";


const api = axios.create({
  baseURL: API_config.Base_URL,
  timeout: API_config.setTimeout,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
},
});



export const AuthenAPI = {
    login: (data: req_authenLogin) => api.post<res_authenLogin>("/auth/login", data),
    refresh: (data: req_authenLogin) => api.post<res_authenLogin>("/auth/refresh", data),
    currentUser: () => api.get<res_authenLogin>("/auth/me"),

};


