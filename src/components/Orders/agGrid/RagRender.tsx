import { ICellRendererParams } from "ag-grid-community";

export default function RagRenderer(params: ICellRendererParams) {
  return <span className="estado-valor">{params.value}</span>;
}