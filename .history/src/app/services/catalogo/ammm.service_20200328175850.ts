import { Injectable } from '@angular/core';
import { ArtMarModMot } from 'src/app/class/ArtMarModMot';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmmmService {


  constructor(public miHttp: BaseService) { }

  public ListarO(): Observable<ArtMarModMot[]> {
    return this.miHttp.httpGetO<ArtMarModMot[]>('/art_mar_mod_mot/');
  }

  public FiltrarP(
    id_linea: string,
    id_marca: string,
    id_combustible: string,
    motor: string,
    modelo: string,
    cilindrada: string,
    competicion: string,
    id_producto: string,
    id_aplicacion: string
  ): Promise<object> {

    const request: object = {

      id_linea: id_linea == null ? '' : id_linea,
      id_marca: id_marca == null ? '' : id_marca,
      id_combustible: id_combustible == null ? '' : id_combustible,
      motor: motor == null ? '' : motor,
      modelo: modelo == null ? '' : modelo,
      cilindrada: cilindrada == null ? '' : cilindrada,
      competicion: competicion == null ? '' : competicion,
      id_producto: id_producto == null ? '' : id_producto,
      id_aplicacion: id_aplicacion == null ? '' : id_aplicacion
    };

    return this.miHttp.httpPostP('/art_mar_mod_mot/filtrar', request);
  }
}
