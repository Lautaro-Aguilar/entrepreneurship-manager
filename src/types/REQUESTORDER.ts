export default interface REQUESTORDER {
  idcliente: number | undefined;
  arrayidsproductos: (number | undefined)[];
  arraydecantidad: (number | undefined)[];
  fechaentrega: string | Date;
  sena: number;
  total: number;
  estado: "Pendiente" | "Finalizado";
}
