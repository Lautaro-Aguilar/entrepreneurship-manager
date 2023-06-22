import ORDER from "../types/ORDER";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "./orders.service";

export const getAll = () => getOrders();

export const getOne = (id: number) => getOrder(id);

export const create = (data: ORDER) => createOrder(data);

export const update = (data: ORDER, id: number) => updateOrder(data, id);

export const destroy = (id: number) => deleteOrder(id);
