import { getDashboardInfo } from "./dashboard.service";

export const getDashboardInitialData = (initialDate: string, lastDate: string) =>
  getDashboardInfo({ initialDate, lastDate });
