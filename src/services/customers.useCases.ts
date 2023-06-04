import CUSTOMER from "../types/CUSTOMER";
import {
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "./customers.service";

export const getAll = () => getCustomers();

export const getOne = (id: number) => getCustomer(id);

export const update = (data: CUSTOMER, id: number) => updateCustomer(data, id);

export const destroy = (id: number) => deleteCustomer(id);
