export class Pedido {
    constructor(
        public idPedido?: number,
        public idClienteSucursal?: number,
        public idCliente?: string,
        public idExpreso?: number,
        public estado?: string,
        public fecha?: number,
        public idDescuento?: string,
        public subtotal?: number,
        public observaciones?: string
    ) { }
}
