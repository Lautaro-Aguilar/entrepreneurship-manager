import React, { useState } from "react";
import PRODUCT from "../../../types/PRODUCT";
import * as useCases from "../../../services/products.service";

interface Parameters {
  products: PRODUCT[];
  updateProducts: (products: PRODUCT[]) => void;
}

export default function useAddProduct({
  products,
  updateProducts,
}: Parameters) {
  const [product, setProduct] = useState<PRODUCT>({
    costo: 0,
    nombre: "",
    precio: 0,
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (product: PRODUCT) => {
    useCases.createProduct(product).then((response) => {
      const newProducts = [...products, product];
      updateProducts(newProducts);
      closeAddModal();
    });
  };

  return {
    product,
    handleChange,
    openAddModal,
    closeAddModal,
    isAddModalOpen,
    handleSubmit,
  };
}
