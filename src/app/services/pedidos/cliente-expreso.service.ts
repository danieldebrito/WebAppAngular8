import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ClienteExpreso } from 'src/app/class/clienteExpreso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteExpresoService {

  public mensaje: any;
  public pedidoAbierto: ClienteExpreso;
  public pedido: ClienteExpreso;

  constructor(public miHttp: BaseService) { }

  public Listar(): Observable<ClienteExpreso[]> {
    return this.miHttp.httpGetO<ClienteExpreso[]>('/cliente_expreso/');
  }

  public Baja(id: string): Promise<object> {
    return this.miHttp.httpDeleteP('/cliente_expreso/' + id);
  }

  public TraerUno(id: string): Observable<ClienteExpreso> {
    return this.miHttp.httpGetO<ClienteExpreso>('/cliente_expreso/' + id);
  }

  public Alta(
    idCliente: string,
    idSucursal: number,
    idExpreso: number,
    estado: string,
    fecha: string,
    observaciones: string,
  ): Promise<object> {
    const request: object = {
      idCliente,
      idSucursal,
      idExpreso,
      estado,
      fecha,
      observaciones
    };
    return this.miHttp.httpPostP('/cliente_expreso/', request);
  }

  public Update(
    idPedido: number,
    idCliente: number,
    idSucursal: number,
    idExpreso: string,
    estado: string,
    fecha: string,
    observaciones: string,
  ): Promise<object> {
    const request: object = {
      idPedido,
      idCliente,
      idSucursal,
      idExpreso,
      estado,
      fecha,
      observaciones
    };
    return this.miHttp.httpPostP('/cliente_expreso/update', request);
  }
}
