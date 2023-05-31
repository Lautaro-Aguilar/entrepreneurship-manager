export default interface SALE {
  id?: number;
  id_cliente: number;
  id_producto: number;
  total: number;
  cantidad: number;
  inserted_at?: Date;
}
