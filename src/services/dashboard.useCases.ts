import { getDashboardInfo } from "./dashboard.service";

export const getDashboardInitialData = (initialDate: Date, lastDate: Date) =>
  getDashboardInfo({ initialDate, lastDate });
