export class PedidoItem {
    constructor(
        public idPedidoItem: number,
        public idPedido: number,
        public idCliente: string,
        public idArticulo: string,
        public cantidad: number,
        //public descripcion_corta: string,
        //public stock: number,
        //public precio_lista: number
    ) { }
}
