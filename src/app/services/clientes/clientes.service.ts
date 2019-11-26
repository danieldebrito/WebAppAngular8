import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Cliente } from 'src/app/class/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(public miHttp: BaseService) { }

  public altaCliente(
    id: string,
    cuit: string,
    razonSocial: string,
    comprador: string,
    email: string,
    clave: string
  ): Promise<Object> {

      const request: Object = {
        id: id,
        cuit: cuit,
        razonSocial: razonSocial,
        comprador: comprador,
        email: email,
        clave: clave
    };
    return this.miHttp.httpPostP('/clientes/', request);
  }

  public traerUno(id: string): Observable<Cliente> {
    return this.miHttp.httpGetO<Cliente>('/clientes/' + '"' + id + '"');
  }
}

