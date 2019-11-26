import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sucursal } from 'src/app/class/sucursal';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  constructor(public miHttp: BaseService) { }

  public Listar(): Observable<Sucursal[]> {
    return this.miHttp.httpGetO<Sucursal[]>('/cliente_sucursales/');
  }

  public ListarPorCliente(id: string): Observable<Sucursal[]> {
    return this.miHttp.httpGetO<Sucursal[]>('/cliente_sucursales/sucursales/' + '"' + id + '"');
  }

  public Baja(id: string): Promise<object> {
    return this.miHttp.httpDeleteP('/cliente_sucursales/' + '"' + id + '"');
  }

  public TraerUno(id: string): Observable<Sucursal> {
    return this.miHttp.httpGetO<Sucursal>('/cliente_sucursales/' + '"' + id + '"');
  }

  public Alta(
    id_cliente: string,
    nombre_sucursal: string,
    calle: string,
    numero: number,
    cp: string,
    localidad: string,
    provincia: string
  ): Promise<object> {
    const request: object = {
      id_cliente,
      nombre_sucursal,
      calle,
      numero,
      cp,
      localidad,
      provincia
    };
    return this.miHttp.httpPostP('/cliente_sucursales/', request);
  }

  public Update(
    id_sucursal: number,
    id_cliente: string,
    nombre_sucursal: string,
    calle: string,
    numero: number,
    cp: string,
    localidad: string,
    provincia: string
  ): Promise<object> {
    const request: object = {
      id_sucursal,
      id_cliente,
      nombre_sucursal,
      calle,
      numero,
      cp,
      localidad,
      provincia
    };
    return this.miHttp.httpPostP('/cliente_sucursales/update', request);
  }
}
