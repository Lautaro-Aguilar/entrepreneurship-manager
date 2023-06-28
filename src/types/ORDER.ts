export default interface ORDER {
  idpedido?: number;
  idcliente?: number;
  arrayidsproductos?: (number | undefined)[];
  arraydecantidad?: (number | undefined)[];
  fechaentrega?: string;
  sena?: number;
  total?: number;
  inserted_at?: Date;
}
