export class Pedido {
    constructor(
        public idPedido?: number,
        public idClienteSucursal?: string,
        public idCliente?: string,
        public idExpreso?: number,
        public estado?: string,
        public fecha?: string,
        public idDescuento?: string,
        public subtotalNeto?: number,
        public observaciones?: string
    ) { }
}
