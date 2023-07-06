export default interface REQUESTORDER {
  idcliente: number | undefined;
  arrayidsproductos: (number | undefined)[];
  arraydecantidad: (number | undefined)[];
  fechaentrega: string | Date;
  total: number;
  estado: "Pendiente" | "Finalizado";
}
