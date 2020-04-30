
export class CarritoItem {
    constructor(
        public idCarritoItem?: number,
        public idPedido?: number,
        public idCliente?: string,
        public idArticulo?: string,
        public cantidad?: number,
        public descripcionCorta?: string,  // no esta en la api
        public stock?: number,  // no esta en la api
        public precioLista?: number
    ) { }
}