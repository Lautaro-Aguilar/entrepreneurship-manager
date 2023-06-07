import { useState, useEffect } from "react";
import PRODUCT from "../../../types/PRODUCT";
import * as useCases from "../../../services/products.useCases";
import { AlertColor } from "@mui/material";

export default function useProducts({
  openSnackBar,
}: {
  openSnackBar: (alertVariant: AlertColor, alertMessage: string) => void;
}) {
  const [products, setProducts] = useState<PRODUCT[]>([]);
  const [openModalModificar, setOpenModalModificar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<PRODUCT>({
    nombre: "",
    costo: 0,
    precio: 0,
  });

  const openModal = () => setOpenModalModificar(true);
  const closeModal = () => setOpenModalModificar(false);

  const handleUpdateProduct = (product: PRODUCT) => {
    setSelectedProduct(product);
    openModal();
  };

  const handleSubmitUpdate = (product: PRODUCT) => {
    useCases.update(product, product.id).then(() => {
      const newProducts = products.map((p) => {
        if (p.id === product.id) {
          return product;
        }
        return p;
      });
      setProducts(newProducts);
      openSnackBar("success", "Producto modificado correctamente 👍");
      closeModal();
    });
  };

  const updateProducts = (products: PRODUCT[]) => {
    setProducts(products);
  };

  useEffect(() => {
    useCases.getAll().then((response) => {
      setProducts(response.data);
    });
  }, []);

  return {
    products,
    openModalModificar,
    openModal,
    closeModal,
    selectedProduct,
    handleUpdateProduct,
    handleSubmitUpdate,
    updateProducts,
  };
}
