export default interface ORDER {
  idpedido?: number;
  idcliente?: number;
  cliente?: string;
  arrayidsproductos?: (number | undefined)[];
  arraydecantidad?: (number | undefined)[];
  fechaentrega?: string | Date;
  fecharealizado: string | Date;
  sena?: number;
  total?: number;
  inserted_at?: Date;
  estado: "Pendiente" | "Finalizado";
}
