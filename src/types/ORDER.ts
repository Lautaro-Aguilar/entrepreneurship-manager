export default interface ORDER {
  idpedido?: number;
  idcliente?: number;
  arrayidsproductos?: (number | undefined)[];
  arraydecantidad?: (number | undefined)[];
  fechaentrega?: string | Date;
  sena?: number;
  total?: number;
  inserted_at?: Date;
  estado: "Pendiente" | "Finalizado";
}
