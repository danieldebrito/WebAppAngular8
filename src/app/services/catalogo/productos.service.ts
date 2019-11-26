import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Producto } from 'src/app/class/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  public allProductos: Producto[] = [];


  constructor(public miHttp: BaseService) { }

  public Listar(): Observable<Producto[]> {
    return this.miHttp.httpGetO<Producto[]>('/productos/');
  }

  public Baja(id: string): Promise<object> {
    return this.miHttp.httpDeleteP('/productos/' + id );
  }

  public TraerUno(id: string): Observable<Producto> {
    return this.miHttp.httpGetO<Producto>('/productos/' +  id );
  }

  public Alta(
    id_producto: string,
    producto: string
  ): Promise<object> {
    const request: object = {
      id_producto,
      producto
    };
    return this.miHttp.httpPostP('/productos/', request);
  }

  public Update(
    id_producto: string,
    producto: string
  ): Promise<object> {
    const request: object = {
      id_producto,
      producto
    };
    return this.miHttp.httpPostP('/productos/update', request);
  }

  public GuardarArtLocalStorage() {
    this.Listar().subscribe(response => {
      this.allProductos = response;
      localStorage.setItem('allProductos', JSON.stringify(this.allProductos));

      return this.allProductos;
    },
      error => {
        console.error(error);
      });
  }

  public LeerArtLocalStorage() {
    this.allProductos = JSON.parse(localStorage.getItem('allProductos'));
    return this.allProductos;
  }

  public traerProd ( id: string ) {
    const tam = this.allProductos.length;

    for ( let i = 0 ; i < tam ; i++) {
      if (this.allProductos[i].id_producto === id) {
        return this.allProductos[i].producto;
      }
    }
  }

  public traerId ( producto: string ) {
    const tam = this.allProductos.length;

    for ( let i = 0 ; i < tam ; i++) {
      if (this.allProductos[i].producto === producto) {
        return this.allProductos[i].id_producto;
      }
    }
  }
}
