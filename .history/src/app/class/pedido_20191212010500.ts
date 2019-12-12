export class Pedido {
    constructor(
        public idPedido: number,
        public idCliente: number,
        public idSucursal: number,
        public idExpreso: number,
        public estado: string,
        public fecha: string,
        public observaciones: string
    ) { }
}
