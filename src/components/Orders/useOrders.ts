import { useEffect, useState } from "react";
import PRODUCTLIST from "../../types/PRODUCTLIST";
import REQUESTORDER from "../../types/REQUESTORDER";
import CUSTOMER from "../../types/CUSTOMER";
import * as orderUseCases from "../../services/orders.usecases"
import * as customersUseCases from "../../services/customers.useCases";
import * as productsUseCases from "../../services/products.useCases";
import PRODUCT from "../../types/PRODUCT";

function useOrders() {
  const [products, setProducts] = useState<PRODUCTLIST[]>([]);

  const currentDate = new Date().toISOString().slice(0, 16);
  const [formDataOrder, setFormDataOrder] = useState<REQUESTORDER>({
    idcliente: 0,
    arraydecantidad: [],
    arrayidsproductos: [],
    fechaentrega: currentDate,
    sena: 0,
    total: 0
  })
  const [productList, setProductList] = useState<PRODUCTLIST[]>([]);
  const [customers, setCustomers] = useState<CUSTOMER[]>([]);

  const [total, setTotal] = useState(0);

  const resolveTotal = (value: number) => {
    setTotal(total + value);
  };

  const handleSubmit = () => {
    /* setFormDataOrder({ ...formDataOrder, ...products }) */
    console.log(formDataOrder)

    const arrayidsproductos = products.map((prod) => prod.id)
    const arraydecantidad = products.map((prod) => prod.quantity)
    const request: REQUESTORDER = {
      idcliente: formDataOrder.idcliente,
      arrayidsproductos,
      arraydecantidad,
      fechaentrega: formDataOrder.fechaentrega,
      sena: formDataOrder.sena,
      total: 0
    }
    orderUseCases.create(request).then((response) => {
      alert('salio bien')
      console.log(response)
    })
  }

  useEffect(() => {
    productsUseCases.getAll().then(({ data }: { data: PRODUCT[] }) => {
      setProductList(data);
    });
    customersUseCases.getAll().then(({ data }: { data: CUSTOMER[] }) => {
      setCustomers(data);
    });
  }, []);

  return {
    products,
    setProducts,
    productList,
    customers,
    resolveTotal,
    total,
    formDataOrder,
    setFormDataOrder,
    handleSubmit
  };
}

export default useOrders