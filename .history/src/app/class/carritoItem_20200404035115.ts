export class PedidoItem {
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
}
