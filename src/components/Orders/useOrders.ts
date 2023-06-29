import { useEffect, useState } from "react";
import PRODUCTLIST from "../../types/PRODUCTLIST";
import REQUESTORDER from "../../types/REQUESTORDER";
import CUSTOMER from "../../types/CUSTOMER";
import * as orderUseCases from "../../services/orders.usecases";
import * as customersUseCases from "../../services/customers.useCases";
import * as productsUseCases from "../../services/products.useCases";
import PRODUCT from "../../types/PRODUCT";

const currentDate = new Date().toISOString().slice(0, 16);

function useOrders({
  open,
  updateGrid,
}: {
  open?: boolean;
  updateGrid: (values: any) => void;
}) {
  const [products, setProducts] = useState<PRODUCTLIST[]>([]);

  const [formDataOrder, setFormDataOrder] = useState<REQUESTORDER>({
    idcliente: 0,
    arraydecantidad: [],
    arrayidsproductos: [],
    fechaentrega: currentDate,
    sena: 0,
    total: 0,
    estado: "Pendiente",
  });
  const [productList, setProductList] = useState<PRODUCTLIST[]>([]);
  const [customers, setCustomers] = useState<CUSTOMER[]>([]);

  const [total, setTotal] = useState(0);

  const resolveTotal = (value: number) => {
    setTotal(total + value);
  };

  const handleSubmit = () => {
    const arrayidsproductos = products.map((prod) => prod.id);
    const arraydecantidad = products.map((prod) => prod.quantity);
    const request: REQUESTORDER = {
      idcliente: formDataOrder.idcliente,
      arrayidsproductos,
      arraydecantidad,
      fechaentrega: new Date(formDataOrder.fechaentrega),
      sena: formDataOrder.sena,
      total: 0,
      estado: "Pendiente",
    };
    console.log("REQUEST", request);
    orderUseCases.create(request).then((response) => {
      const newOrders = response.data;
      updateGrid(newOrders);
    });
  };

  useEffect(() => {
    productsUseCases.getAll().then(({ data }: { data: PRODUCT[] }) => {
      setProductList(data);
    });
    customersUseCases.getAll().then(({ data }: { data: CUSTOMER[] }) => {
      setCustomers(data);
    });

    return () => {
      setProducts([]);
      setProductList([]);
      setFormDataOrder({
        idcliente: 0,
        arraydecantidad: [],
        arrayidsproductos: [],
        fechaentrega: currentDate,
        sena: 0,
        total: 0,
        estado: "Pendiente",
      });
    };
  }, [open]);

  return {
    products,
    setProducts,
    productList,
    customers,
    resolveTotal,
    total,
    formDataOrder,
    setFormDataOrder,
    handleSubmit,
  };
}

export default useOrders;
