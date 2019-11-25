export class Sucursal {
    constructor(
        public id_sucursal: number,
        public id_cliente: string,
        public nombre_sucursal: string,
        public calle: string,
        public numero: number,
        public cp: string,
        public localidad: string,
        public provincia: string
    ) { }
}
