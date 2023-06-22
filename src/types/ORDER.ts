export default interface ORDER {
  idpedido?: number;
  idcliente?: number;
  arrayidsproductos?: number[];
  arraydecantidad?: number[];
  fechaentrega?: Date;
  sena?: number;
  total?: number;
  inserted_at?: Date;
}
