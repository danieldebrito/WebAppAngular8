import { Injectable } from '@angular/core';
import { Cards } from 'src/app/class/cards';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {


  constructor(public miHttp: BaseService) { }

  public ListarO(): Observable<Cards[]> {
    return this.miHttp.httpGetO<Cards[]>('/cards/');
  }

  public getById(id): Observable<Cards[]> {
    return this.miHttp.httpGetO<Cards[]>('/cards/ ' + id);
  }

  public FiltrarP(
    linea: string,
    marca: string,
    combustible: string,
    motor: string,
    modelo: string,
    cilindrada: string,
    competicion: string,
    producto: string,
    aplicacion: string
  ): Promise<object> {

    const request: object = {

      linea: linea == null ? '' : linea,
      marca: marca == null ? '' : marca,
      combustible: combustible == null ? '' : combustible,
      motor: motor == null ? '' : motor,
      modelo: modelo == null ? '' : modelo,
      cilindrada: cilindrada == null ? '' : cilindrada,
      competicion: competicion == null ? '' : competicion,
      producto: producto == null ? '' : producto,
      aplicacion: aplicacion == null ? '' : aplicacion
    };

    return this.miHttp.httpPostP('/cards/filtrar', request);
  }
}
