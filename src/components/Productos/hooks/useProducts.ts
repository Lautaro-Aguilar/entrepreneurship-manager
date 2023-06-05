import { useState, useEffect } from "react";
import PRODUCT from "../../../types/PRODUCT";
import * as useCases from "../../../services/products.useCases";

export default function useProducts() {
    const [products, setProducts] = useState<PRODUCT[]>([]);
    const [openModalModificar, setOpenModalModificar] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<PRODUCT>({
        nombre: "",
        costo: 0,
        precio: 0,
    });

    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

    const openSnackBar = () => setIsSnackBarOpen(true);
    const closeSnackBar = () => setIsSnackBarOpen(false);

    const openModal = () => setOpenModalModificar(true);
    const closeModal = () => setOpenModalModificar(false);

    const handleUpdateProduct = (product: PRODUCT) => {
        setSelectedProduct(product);
        openModal();
    };

    const handleSubmitUpdate = (product: PRODUCT) => {
        useCases.update(product, product.id).then(() => {
            openSnackBar();
            const newProducts = products.map((p) => {
                if (p.id === product.id) {
                    return product;
                }
                return p;
            });
            setProducts(newProducts);
            closeModal();
        });
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
        isSnackBarOpen,
        closeSnackBar,
    };
}
