export class Pedido {
    constructor(
        public id_pedido: number,
        public id_sucursal: number,
        public id_expreso: number,
        public envio: string,
        public fecha: string,
        public observaciones: string
    ) { }
}
