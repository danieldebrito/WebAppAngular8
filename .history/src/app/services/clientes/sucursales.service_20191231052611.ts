import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteSucursal } from 'src/app/class/clienteSucursal';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  constructor(public miHttp: BaseService) { }

  public Listar(): Observable<ClienteSucursal[]> {
    return this.miHttp.httpGetO<ClienteSucursal[]>('/cliente_sucursales/');
  }

  public ListarPorCliente(id: string): Observable<ClienteSucursal[]> {
    return this.miHttp.httpGetO<ClienteSucursal[]>('/cliente_sucursales/sucursales/' + '"' + id + '"');
  }

  public Baja(id: string): Promise<object> {
    return this.miHttp.httpDeleteP('/cliente_sucursales/' + '"' + id + '"');
  }

  public TraerUno(id: string): Observable<ClienteSucursal> {
    return this.miHttp.httpGetO<ClienteSucursal>('/cliente_sucursales/' + '"' + id + '"');
  }

  /*
        public idSucursal: string,
        public idCliente: string,
        public idClienteExpreso: string,
        public nombreSucursal: string,
        public calle: string,
        public numero: string,
        public cp: string,
        public localidad: string,
        public provincia: string

  */

  public Alta(
    idClienteExpreso: number,
    idCliente: string,
    nombreSucursal: string,
    calle: string,
    numero: number,
    cp: string,
    localidad: string,
    provincia: string
  ): Promise<object> {
    const request: object = {
      idClienteExpreso,
      idCliente,
      nombreSucursal,
      calle,
      numero,
      cp,
      localidad,
      provincia
    };
    return this.miHttp.httpPostP('/cliente_sucursales/', request);
  }

  public Update(
    idSucursal: number,
    idCliente: string,
    idClienteExpreso: number,
    nombreSucursal: string,
    calle: string,
    numero: number,
    cp: string,
    localidad: string,
    provincia: string
  ): Promise<object> {
    const request: object = {
      idSucursal,
      idCliente,
      idClienteExpreso,
      nombreSucursal,
      calle,
      numero,
      cp,
      localidad,
      provincia
    };
    return this.miHttp.httpPostP('/cliente_sucursales/update', request);
  }

  public ReadByName(name: string): Observable<ClienteSucursal> {
    return this.miHttp.httpGetO<ClienteSucursal>('/cliente_sucursales/byName/' + '"' + name + '"');
  }


}
