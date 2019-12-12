export class PedidoItem {
    constructor(
        public id_pedido_item: number,
        public id_cliente: string,
        public id_pedido: number,
        public id_articulo: string,
        public cantidad: number,
        public estado: string,
        public descripcion_corta: string,
        public stock: number,
        public precio_lista: number
    ) { }
}
