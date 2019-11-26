import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Marca } from 'src/app/class/marca';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  public allMarcas: Marca[] = [];


  constructor(public miHttp: BaseService) { }

  public Listar(): Observable<Marca[]> {
    return this.miHttp.httpGetO<Marca[]>('/marcas/');
  }

  public Baja(id: string): Promise<object> {
    return this.miHttp.httpDeleteP('/marcas/' + id );
  }

  public TraerUno(id: string): Observable<Marca> {
    return this.miHttp.httpGetO<Marca>('/marcas/' + '"' + id + '"' );
  }

  public Alta(
    id_producto: string,
    producto: string
  ): Promise<object> {
    const request: object = {
      id_producto,
      producto
    };
    return this.miHttp.httpPostP('/marcas/', request);
  }

  public Update(
    id_producto: string,
    producto: string
  ): Promise<object> {
    const request: object = {
      id_producto,
      producto
    };
    return this.miHttp.httpPostP('/marcas/update', request);
  }

  public GuardarArtLocalStorage() {
    this.Listar().subscribe(response => {
      this.allMarcas = response;
      localStorage.setItem('allMarcas', JSON.stringify(this.allMarcas));

      return this.allMarcas;
    },
      error => {
        console.error(error);
      });
  }

  public LeerArtLocalStorage() {
    this.allMarcas = JSON.parse(localStorage.getItem('allMarcas'));
    return this.allMarcas;
  }

  public traerMarca ( id: string ) {
    const tam = this.allMarcas.length;

    for ( let i = 0 ; i < tam ; i++) {
      if (this.allMarcas[i].id_marca === id) {
        return this.allMarcas[i].marca;
      }
    }
  }

  public traerId ( marca: string ) {
    const tam = this.allMarcas.length;

    for ( let i = 0 ; i < tam ; i++) {
      if (this.allMarcas[i].marca === marca) {
        return this.allMarcas[i].id_marca;
      }
    }
  }
}
