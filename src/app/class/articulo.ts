export class Articulo {
    constructor(
        public id_articulo: string,
        public id_producto: string,
        public id_aplicacion: string,
        public id_material: string,
        public descripcion_corta: string,
        public no_comercializable: string,
        public no_muestra_item: string,
        public stock: string,
        public unid_pack_juego_tapa: string,
        public cant_kit: string,
        public pack_venta: string,
        public precio_lista: number,
        public img_peq_url: string,
        public img_gde_url: string,
        public img_envase_url: string,
        public pdf_catalogo: string,
        public prioridad_busquedas: string,
        public en_promocion: string,
        public nuevo_lanzamiento: string,
        public origen: string
    ) { }
}
