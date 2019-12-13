export class PedidoItem {
    constructor(
        public idPedidoItem: number,
        public idPedido: number,
        public idCliente: string,
        public idArticulo: string,
        public cantidad: number,
        public descripcionCorta: string,
        public stock: number,
        public precioLista: number
    ) { }
}
