
export class CarritoItem {
    constructor(
        public idCarritoItem?: string,
        public idPedido?: number,
        public idCliente?: string,
        public idArticulo?: string,
        public cantidad?: number,
        public descripcionCorta?: string,
        public precioLista?: number
    ) { }
}