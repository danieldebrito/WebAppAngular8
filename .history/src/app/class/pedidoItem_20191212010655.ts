export class PedidoItem {
    constructor(
        public idPedidoItem: number,
        public idPedido: number,
        public idArticulo: string,
        public cantidad: number
    ) { }
}
