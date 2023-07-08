import { useEffect, useState } from "react";
import ORDER from "../../types/ORDER";
import * as useCases from "../../services/dashboard.useCases";
import { ChartData } from "chart.js";

function useDashboard() {
  const [cardData, setCardData] = useState({
    clientsCount: 0,
    profit: 0,
    sells: 0,
  });
  const [chartBarData, setChartBarData] = useState<
    ChartData<"bar", (number | [number, number] | null)[], unknown>
  >({
    labels: [],
    datasets: [],
  });

  const [lastSells, setLastSells] = useState<ORDER[] | undefined>([]);

  const [dates, setDates] = useState({
    from: "",
    until: "",
  });

  const [isWorking, setIsWorking] = useState(true);
  const [errors, setErrors] = useState<any[]>([]);

  const handleChangeDates = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDates({ ...dates, [name]: value });
  };

  useEffect(() => {
    const getInitialData = async () => {
      setIsWorking(true);
      const initialDate = new Date("2023-06-01 00:00:00");
      const lastDate = new Date("2023-07-11 00:00:00");
      const { data, errors } = await useCases.getDashboardInitialData(
        initialDate,
        lastDate
      );

      const {
        chartArrayResponse,
        clientsCount,
        lastSellsResponse,
        profit,
        sells,
      } = data;

      setCardData({
        clientsCount,
        profit,
        sells,
      });
      setChartBarData(chartArrayResponse);
      setLastSells(lastSellsResponse);
      errors.length > 0 && setErrors(errors);
      setIsWorking(false);
    };
    getInitialData();
  }, []);

  return {
    cardData,
    lastSells,
    dates,
    handleChangeDates,
    isWorking,
    chartBarData,
    errors,
  };
}

export default useDashboard;
