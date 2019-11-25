export class ClienteSucursal {
    constructor(
        public id_sucursal: string,
        public id_cliente: string,
        public nombre_sucursal: string,
        public calle: string,
        public numero: string,
        public cp: string,
        public localidad: string,
        public provincia: string
    ) { }
}
