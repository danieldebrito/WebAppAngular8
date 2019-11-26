import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Aplicacion } from 'src/app/class/aplicacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AplicacionesService {

  public allAplicaciones: Aplicacion[] = [];


  constructor(public miHttp: BaseService) { }

  public Listar(): Observable<Aplicacion[]> {
    return this.miHttp.httpGetO<Aplicacion[]>('/aplicaciones/');
  }
  public Baja(id: string): Promise<object> {
    return this.miHttp.httpDeleteP('/aplicaciones/' + id );
  }
  public TraerUno(id: string): Observable<Aplicacion> {
    return this.miHttp.httpGetO<Aplicacion>('/aplicaciones/' +  id );
  }
  public Alta(
    id_aplicacion: string,
    codigo_app: string,
    aplicacion: string,
    activo: string
  ): Promise<object> {
    const request: object = {
      id_aplicacion,
      codigo_app,
      aplicacion,
      activo
    };
    return this.miHttp.httpPostP('/aplicaciones/', request);
  }
  public Update(
    id_aplicacion: string,
    codigo_app: string,
    aplicacion: string,
    activo: string
  ): Promise<object> {
    const request: object = {
      id_aplicacion,
      codigo_app,
      aplicacion,
      activo
    };
    return this.miHttp.httpPostP('/aplicaciones/update', request);
  }

  public GuardarArtLocalStorage() {
    this.Listar().subscribe(response => {
      this.allAplicaciones = response;
      localStorage.setItem('allAplicaciones', JSON.stringify(this.allAplicaciones));

      return this.allAplicaciones;
    },
      error => {
        console.error(error);
      });
  }

  public LeerArtLocalStorage() {
    this.allAplicaciones = JSON.parse(localStorage.getItem('allAplicaciones'));
    return this.allAplicaciones;
  }

  public traerApp( id: string ) {
    const tam = this.allAplicaciones.length;

    for ( let i = 0 ; i < tam ; i++) {
      if (this.allAplicaciones[i].id_aplicacion === id) {
        return this.allAplicaciones[i].aplicacion;
      }
    }
  }

  public traerId( aplicacion: string ) {
    const tam = this.allAplicaciones.length;

    for ( let i = 0 ; i < tam ; i++) {
      if (this.allAplicaciones[i].aplicacion === aplicacion) {
        return this.allAplicaciones[i].id_aplicacion;
      }
    }
  }

}
