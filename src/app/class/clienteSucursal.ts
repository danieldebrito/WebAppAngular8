export class ClienteSucursal {
    constructor(
        public idSucursal: string,
        public idCliente: string,
        public idClienteExpreso: number,
        public nombreSucursal: string,
        public calle: string,
        public numero: number,
        public cp: string,
        public localidad: string,
        public provincia: string
    ) { }
}
