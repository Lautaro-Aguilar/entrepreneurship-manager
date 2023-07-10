import ORDER from './ORDER'
export default interface OrderResponse extends ORDER {
  cliente: string;
  productos: string;
  cantidades: string;
  fecharealizado: string;
}
