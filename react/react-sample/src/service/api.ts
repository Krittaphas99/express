import axios from "axios";
import {Product,Root} from "@/types/product";
import { API_config } from "@/constants/config";

const api = axios.create({
  baseURL: API_config.Base_URL,
  timeout: API_config.setTimeout,
});

export const ProductsAPI = {
getALL:() => api.get<Root>("/products"),
getOne:(id:number) => api.get<Product>(`/products/${id}`),
}
    
