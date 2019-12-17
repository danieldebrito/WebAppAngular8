export class Pedido {
    constructor(
        public idPedido: number,
        public idClienteSucursal: number,
        public idCliente: string,
        public idExpreso: number,
        public estado: string,
        public fecha: string,
        public observaciones: string
    ) { }
}
