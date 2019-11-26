import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Linea } from 'src/app/class/linea';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineasService {

  public allLineas: Linea[] = [];


  constructor(public miHttp: BaseService) { }

  public Listar(): Observable<Linea[]> {
    return this.miHttp.httpGetO<Linea[]>('/lineas/');
  }

  public Baja(id: string): Promise<object> {
    return this.miHttp.httpDeleteP('/lineas/' + id );
  }

  public TraerUno(id: string): Observable<Linea> {
    return this.miHttp.httpGetO<Linea>('/lineas/' +  id );
  }

  public Alta(
    id_linea: string,
    linea: string
  ): Promise<object> {
    const request: object = {
      id_linea,
      linea
    };
    return this.miHttp.httpPostP('/lineas/', request);
  }

  public Update(
    id_linea: string,
    linea: string
  ): Promise<object> {
    const request: object = {
      id_linea,
      linea
    };
    return this.miHttp.httpPostP('/lineas/update', request);
  }

  public GuardarArtLocalStorage() {
    this.Listar().subscribe(response => {
      this.allLineas = response;
      localStorage.setItem('allLineas', JSON.stringify(this.allLineas));

      return this.allLineas;
    },
      error => {
        console.error(error);
      });
  }

  public LeerArtLocalStorage() {
    this.allLineas = JSON.parse(localStorage.getItem('allLineas'));
    return this.allLineas;
  }

  public traerLinea ( id: string ) {
    const tam = this.allLineas.length;

    for ( let i = 0 ; i < tam ; i++) {
      if (this.allLineas[i].id_linea === id) {
        return this.allLineas[i].linea;
      }
    }
  }

  public traerId ( linea: string ) {
    const tam = this.allLineas.length;

    for ( let i = 0 ; i < tam ; i++) {
      if (this.allLineas[i].linea === linea) {
        return this.allLineas[i].id_linea;
      }
    }
  }
}
