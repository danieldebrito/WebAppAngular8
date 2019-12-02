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

      id_linea: linea == null ? '' : linea,
      id_marca: marca == null ? '' : marca,
      id_combustible: combustible == null ? '' : combustible,
      motor: motor == null ? '' : motor,
      modelo: modelo == null ? '' : modelo,
      cilindrada: cilindrada == null ? '' : cilindrada,
      competicion: competicion == null ? '' : competicion,
      id_producto: producto == null ? '' : producto,
      id_aplicacion: aplicacion == null ? '' : aplicacion
    };

    return this.miHttp.httpPostP('/cards/filtrar', request);
  }
}
