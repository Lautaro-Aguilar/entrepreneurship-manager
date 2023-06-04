import { GridApi } from "ag-grid-community";

interface MyParams {
  api: GridApi;
}
function onGridReady(params: MyParams) {
  params.api.sizeColumnsToFit();
}
const options = {
  alwaysShowHorizontalScroll: true,
  suppressHorizontalScroll: false,
  defaultColDef: {
    resizable: true,
    sortable: true,
    filter: true,
  },
  flex: true,
  onGridReady,
};

export default options;
