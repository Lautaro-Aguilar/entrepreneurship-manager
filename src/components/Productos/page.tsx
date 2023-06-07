import { Box, Button, Container, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import ModalAgregar from "./ModalAgregar";
import ModalModificar from "./ModalModificar";
import ModalEliminar from "./ModalEliminar";
import buildColumns from "./grid/columns";
import options from "./grid/options";
import useModifyProducts from "./hooks/useModifyProduct";
import useRemoveProducts from "./hooks/useRemoveProducts";
import useAddProduct from "./hooks/useAddProduct";
import SnackbarCustom from "../shared/SnackbarCustom";
import useSnackBar from "../shared/hooks/useSnackBar";

function Productos() {
  const { isSnackBarOpen, snackOptions, openSnackBar, closeSnackBar } =
    useSnackBar();

  const {
    products,
    closeModal,
    openModalModificar,
    selectedProduct,
    handleUpdateProduct,
    handleSubmitUpdate,
    updateProducts,
  } = useModifyProducts({ openSnackBar });

  const {
    handleRowsSelected,
    rowsSelected,
    handleDeleteRows,
    closeRemoveModal,
    isRemoveModalOpen,
    openRemoveModal,
  } = useRemoveProducts({ updateProducts, openSnackBar });

  const {
    closeAddModal,
    handleChange,
    isAddModalOpen,
    openAddModal,
    product,
    handleSubmit,
  } = useAddProduct({ products, updateProducts, openSnackBar });

  const columns = buildColumns(handleUpdateProduct);

  return (
    <Container
      sx={{
        py: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SnackbarCustom
        isSnackBarOpen={isSnackBarOpen}
        closeSnackBar={closeSnackBar}
        message={snackOptions.message}
        variant={snackOptions.variant}
      />
      <Typography variant='h3' component='h1'>
        Registro de Productos
      </Typography>

      <Box sx={{ width: "100%", my: 2 }}>
        <Box
          className='ag-theme-alpine-dark'
          style={{ height: 400, width: "100%" }}
        >
          <AgGridReact
            rowData={products}
            columnDefs={columns}
            gridOptions={options}
            rowSelection='multiple'
            onRowSelected={(e) => handleRowsSelected(e)}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            my: 2,
            justifyContent: "space-around",
          }}
        >
          <Button
            variant='contained'
            color='info'
            size='large'
            onClick={openAddModal}
          >
            Agregar
          </Button>
          <Button
            variant='contained'
            color='error'
            size='large'
            onClick={openRemoveModal}
          >
            Eliminar
          </Button>
        </Box>
      </Box>
      <ModalAgregar
        isOpen={isAddModalOpen}
        closeModal={closeAddModal}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        product={product}
      />
      <ModalModificar
        isOpen={openModalModificar}
        closeModal={closeModal}
        productToModify={selectedProduct}
        handleSubmitUpdate={handleSubmitUpdate}
      />
      <ModalEliminar
        isOpen={isRemoveModalOpen}
        closeModal={closeRemoveModal}
        products={rowsSelected}
        handleRemoveSubmit={handleDeleteRows}
      />
    </Container>
  );
}

export default Productos;
