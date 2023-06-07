import PRODUCT from "../types/PRODUCT";
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "./products.service";

export const getAll = () => getProducts();

export const getOne = (id: number) => getProduct(id);

export const create = (data: PRODUCT) => createProduct(data);

export const update = (data: PRODUCT, id?: number) => updateProduct(data, id);
/* 

export const destroy = (id) => deleteClient(id);
 */
