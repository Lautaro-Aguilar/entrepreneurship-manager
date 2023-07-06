import ORDER from "../types/ORDER";
import SELECTEDORDER from "../types/SELECTEDORDER";
import {
  createOrder,
  deleteOrders,
  getOrder,
  getOrders,
  updateOrder,
  updateStateOrder,
} from "./orders.service";

export const getAll = () => getOrders();

export const getOne = (id: number) => getOrder(id);

export const create = (data: ORDER) => createOrder(data);

export const update = (data: ORDER, id: number) => updateOrder(data, id);

export const updateState = (orders: SELECTEDORDER[]) =>
  updateStateOrder(orders);

export const destroy = (orderIDs: number[]) => deleteOrders(orderIDs)
