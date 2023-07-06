export default interface SELECTEDORDER {
  cliente: string;
  cantidades: string;
  estado: string;
  fechaentrega?: string | Date;
  fecharealizado: string;
  idpedido: number;
  productos: string;
  total: number;
}