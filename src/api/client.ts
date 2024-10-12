import axios from "axios";
import { IProduct } from "../types/product";

const API_URL = "http://localhost:5001/products";

export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchProduct = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const addProduct = async (product: IProduct) => {
  const response = await axios.post<IProduct>(API_URL, product);
  return response.data;
};

export const updateProduct = async (product: IProduct) => {
  const response = await axios.put<IProduct>(
    `${API_URL}/${product.id}`,
    product
  );
  return response.data;
};
