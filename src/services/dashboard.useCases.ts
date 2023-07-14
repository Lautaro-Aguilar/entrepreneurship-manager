import { getDashboardInfo } from "./dashboard.service";

export const getDashboardInitialData = (
  initialDate: string,
  lastDate: string,
  mode: string
) => getDashboardInfo({ initialDate, lastDate, mode });
