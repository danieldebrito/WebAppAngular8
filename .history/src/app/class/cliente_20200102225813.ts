export class Cliente {
    constructor(
        public idCliente: string,
        public cuit: string,
        public razonSocial: string,
        public condFiscal: string,
        public retIIBBcoef: string,
        public idDescuento: string,
        public userNombre: string,
        public email: string,
        public clave: string,
        public estado: string
    ) { }
}