import { useContext, useEffect, useState } from "react";
import ORDER from "../../types/ORDER";
import * as useCases from "../../services/dashboard.useCases";
import { ChartData } from "chart.js";
import obtenerFechas from "../../utils/obtenerFechas";
import { format } from "date-fns";
import { Theme, useTheme } from "@mui/material";
import { ColorModeContext } from "../../App";

function useDashboard() {
  const { mode } = useContext(ColorModeContext);
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

  const handleBusquedaDatos = async () => {
    setIsWorking(true);
    const newDates = {
      from: format(new Date(dates.from), "MM-dd-yyyy"),
      until: format(new Date(dates.until), "MM-dd-yyyy"),
    };
    const { data } = await useCases.getDashboardInitialData(
      newDates.from,
      newDates.until,
      mode
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
    setIsWorking(false);
  };

  useEffect(() => {
    const getInitialData = async () => {
      setIsWorking(true);
      const [fechaActual, fechaAnterior] = obtenerFechas();
      setDates({
        from: fechaAnterior,
        until: fechaActual,
      });
      const { data, errors } = await useCases.getDashboardInitialData(
        fechaAnterior,
        fechaActual,
        mode
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
    handleBusquedaDatos,
  };
}

export default useDashboard;
