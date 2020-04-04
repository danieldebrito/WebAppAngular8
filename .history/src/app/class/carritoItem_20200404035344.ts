export interface CarritoItem {
    idPedidoItem?: number;
    idPedido?: number;
    idCliente?: string;
    idArticulo?: string;
    cantidad?: number;
    precio_lista?: number;
}


/*export class PedidoItem {
    constructor(
        public idPedidoItem: number,
        public idPedido: number,
        public idCliente: string,
        public idArticulo: string,
        public cantidad: number,
        public descripcion_corta: string,  // no esta en la api
        public stock: number,  // no esta en la api
        public precio_lista: number
    ) { }
} */
