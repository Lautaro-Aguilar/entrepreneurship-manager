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
    from: new Date().toLocaleDateString("es-es"),
    until: new Date().toLocaleDateString("es-es"),
  });

  const [isWorking, setIsWorking] = useState(true);
  const [errors, setErrors] = useState<any[]>([]);

  const handleChangeDates = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDates({ ...dates, [name]: value });
  };

  useEffect(() => {
    const getInitialData = async () => {
      function obtenerFechas(): [Date, Date] {
        const hoy = new Date(); // Obtiene la fecha actual

        // Copia la fecha actual y resta un mes
        const fechaHaceUnMes = new Date(
          hoy.getFullYear(),
          hoy.getMonth() - 1,
          hoy.getDate(),
          hoy.getHours(),
          hoy.getMinutes(),
          hoy.getSeconds()
        );

        return [hoy, fechaHaceUnMes];
      }

      setIsWorking(true);
      const [fechaActual, fechaAnterior] = obtenerFechas();
      setDates({
        from: fechaAnterior.toDateString(),
        until: fechaActual.toDateString(),
      });
      const { data, errors } = await useCases.getDashboardInitialData(
        fechaAnterior,
        fechaActual
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
