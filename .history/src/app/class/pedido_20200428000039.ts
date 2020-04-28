export class Pedido {
    constructor(
        public estado?: string,
        public fecha?: string,
        public idCliente?: string,
        public idDescuento?: string,
        public idExpreso?: number,
        public idPedido?: string,
        public idSucursal?: number,
        public observaciones?: string
    ) { }
}
