export class Cliente {
    constructor(
        public id: string,
        public cuit: string,
        public razonSocial: string,
        public comprador: string,
        public email: string,
        public clave: string,
        public estado: string
    ) { }
}
