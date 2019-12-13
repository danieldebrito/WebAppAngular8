export class Pedido {
    constructor(
        public idPedido: number,
        public idCliente: string,
        public idSucursal: number,
        public idExpreso: number,
        public estado: string,
        public fecha: string,
        public observaciones: string
    ) { }
}
