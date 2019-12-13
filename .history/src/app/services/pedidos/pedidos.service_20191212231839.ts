import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// class
import { Pedido } from 'src/app/class/pedido';
// services
import { AuthService } from 'src/app/services/clientes/auth.service';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  public fecha: string;
  public hora: string;
  public mensaje: any;
  public pedidoAbierto: Pedido;
  public pedido: Pedido;

  constructor(public miHttp: BaseService, private authService: AuthService) { }

  public Listar(): Observable<Pedido[]> {
    return this.miHttp.httpGetO<Pedido[]>('/pedidos/');
  }

  public Baja(id: string): Promise<object> {
    return this.miHttp.httpDeleteP('/pedidos/' + '"' + id + '"');
  }

  public TraerUno(id: string): Observable<Pedido> {
    return this.miHttp.httpGetO<Pedido>('/pedidos/' + '"' + id + '"');
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
    return this.miHttp.httpPostP('/pedidos/', request);
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
    return this.miHttp.httpPostP('/pedidos/update', request);
  }
/*
  public traerpedidoAbierto(id_cliente: string): Observable<Pedido> {
    return this.miHttp.httpGetO<Pedido>('/pedidos/abierto/' + '"' + id_cliente + '"' );
  } // pedido de un mismo cliente abierto

  public ListarPedidosCliente(id_cliente): Observable<Pedido[]> {
    return this.miHttp.httpGetO<Pedido[]>('/pedidos/cliente/' + '"' + id_cliente + '"');
  } // lista todos los pedidos de un cliente
  */

  getfecha() {
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString();
    const mes = (fechaActual.getMonth() + 1).toString();
    const anio = fechaActual.getFullYear().toString();
    const hora = fechaActual.getHours().toString();
    const minutos = fechaActual.getMinutes().toString();
    const segundos = fechaActual.getSeconds().toString();
    this.fecha = anio + '/' + mes + '/' + dia;
    this.hora = hora + ':' + minutos + ':' + segundos;

    const ret = this.fecha;

    return ret;
  }
}
