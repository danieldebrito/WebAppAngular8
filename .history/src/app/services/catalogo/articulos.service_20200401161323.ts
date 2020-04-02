import { Injectable } from '@angular/core';
import { Articulo } from 'src/app/class/articulo';
import { BaseService } from 'src/app/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  public allArticulos: Articulo[] = [];
  public artDetalle: Articulo;
  public show: boolean; // true, muestra grilla, false, muestra detalle de art
  public showDetail: boolean; // true, muestra varciones, false, muestra detalle de juego, en detalle de producto

  constructor(public miHttp: BaseService) { }

  public Listar(): Observable<Articulo[]> {
    return this.miHttp.httpGetO<Articulo[]>('/articulos/');
  }
  public Baja(id: string): Promise<object> {
    return this.miHttp.httpDeleteP('/articulos/' + id);
  }
  public TraerUno(id: string): Observable<Articulo> {
    return this.miHttp.httpGetO<Articulo>('/articulos/' + id);
  }
  public Alta(
    id_articulo: string,
    id_producto: string,
    id_aplicacion: string,
    id_material: string,
    descripcion_corta: string,
    no_comercializable: string,
    no_muestra_item: string,
    stock: string,
    unid_pack_juego_tapa: string,
    cant_kit: string,
    pack_venta: string,
    precio_lista: number,
    img_peq_url: string,
    img_gde_url: string,
    img_envase_url: string,
    pdf_catalogo: string,
    prioridad_busquedas: string,
    en_promocion: string,
    nuevo_lanzamiento: string,
    origen: string
  ): Promise<object> {
    const request: object = {
      id_articulo,
      id_producto,
      id_aplicacion,
      id_material,
      descripcion_corta,
      no_comercializable,
      no_muestra_item,
      stock,
      unid_pack_juego_tapa,
      cant_kit,
      pack_venta,
      precio_lista,
      img_peq_url,
      img_gde_url,
      img_envase_url,
      pdf_catalogo,
      prioridad_busquedas,
      en_promocion,
      nuevo_lanzamiento,
      origen
    };
    return this.miHttp.httpPostP('/articulos/', request);
  }
  public Update(
    id_articulo: string,
    id_producto: string,
    id_aplicacion: string,
    id_material: string,
    descripcion_corta: string,
    no_comercializable: string,
    no_muestra_item: string,
    stock: string,
    unid_pack_juego_tapa: string,
    cant_kit: string,
    pack_venta: string,
    precio_lista: number,
    img_peq_url: string,
    img_gde_url: string,
    img_envase_url: string,
    pdf_catalogo: string,
    prioridad_busquedas: string,
    en_promocion: string,
    nuevo_lanzamiento: string,
    origen: string
  ): Promise<object> {
    const request: object = {
      id_articulo,
      id_producto,
      id_aplicacion,
      id_material,
      descripcion_corta,
      no_comercializable,
      no_muestra_item,
      stock,
      unid_pack_juego_tapa,
      cant_kit,
      pack_venta,
      precio_lista,
      img_peq_url,
      img_gde_url,
      img_envase_url,
      pdf_catalogo,
      prioridad_busquedas,
      en_promocion,
      nuevo_lanzamiento,
      origen
    };
    return this.miHttp.httpPostP('/articulos/update', request);
  }

  public GuardarArtLocalStorage() {
    this.Listar().subscribe(response => {
      this.allArticulos = response;
      localStorage.setItem('allArticulos', JSON.stringify(this.allArticulos));

      return this.allArticulos;
    },
      error => {
        console.error(error);
      });
  }

  public LeerArtLocalStorage() {
    this.allArticulos = JSON.parse(localStorage.getItem('allArticulos'));
  }

  public traerImgArt(id: string) {
    const tam = this.allArticulos.length;
    for (let i = 0; i < tam; i++) {
      if (this.allArticulos[i].id_articulo === id) {
        return this.allArticulos[i].img_peq_url;
      }
    }
  }

  public traeDescripCorta(id: string) {
    const tam = this.allArticulos.length;
    for (let i = 0; i < tam; i++) {
      if (this.allArticulos[i].id_articulo === id) {
        return this.allArticulos[i].descripcion_corta;
      }
    }
  }

  public traerArtLocalStorage(id: string) {
    const tam = this.allArticulos.length;
    for (let i = 0; i < tam; i++) {
      if (this.allArticulos[i].id_articulo === id) {
        return this.allArticulos[i];
      }
    }
  }
}

