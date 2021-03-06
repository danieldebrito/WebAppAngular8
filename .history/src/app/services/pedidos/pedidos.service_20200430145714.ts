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

  public idPedido; // id del pedido abierto

  constructor(public miHttp: BaseService, private authService: AuthService) { }

  public Listar(): Observable<Pedido[]> {
    return this.miHttp.httpGetO<Pedido[]>('/pedidos/');
  }

  public Baja(id: number): Promise<object> {
    return this.miHttp.httpDeleteP('/pedidos/' + '"' + id + '"');
  }

  public TraerUno(id: string): Observable<Pedido> {
    return this.miHttp.httpGetO<Pedido>('/pedidos/' + id);
  }

  public Alta(
    // idPedido: number,  AI
    idClienteSucursal: string,
    idCliente: string,
    idExpreso: string,
    estado: string,
    fecha: string,
    idDescuento: string,
    subtotalNeto: number,
    observaciones: string
  ): Promise<object> {
    const request: object = {
    // idPedido: number,    AI
    idClienteSucursal,
    idCliente,
    idExpreso,
    estado,
    fecha,
    idDescuento,
    subtotalNeto,
    observaciones
    };
    return this.miHttp.httpPostP('/pedidos/', request);
  }

  public Update(
    idPedido: number,
    idClienteSucursal: string,
    idCliente: string,
    idExpreso: string,
    estado: string,
    fecha: string,
    idDescuento: string,
    subtotalNeto: number,
    observaciones: string
    ): Promise<object> {
    const request: object = {
    idPedido,
    idClienteSucursal,
    idCliente,
    idExpreso,
    estado,
    fecha,
    idDescuento,
    subtotalNeto,
    observaciones
    };
    return this.miHttp.httpPostP('/pedidos/update', request);
  }

  public traerpedidoAbierto(idCliente: string): Observable<Pedido> {
    return this.miHttp.httpGetO<Pedido>('/pedidos/abierto/' + '"' + idCliente + '"');
  }

  public ListarPedidosCliente(idCliente): Observable<Pedido[]> {
    return this.miHttp.httpGetO<Pedido[]>('/pedidos/cliente/' + '"' + idCliente + '"');
  }

  getfecha() {
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString();
    const mes = (fechaActual.getMonth() + 1).toString();
    const anio = fechaActual.getFullYear().toString();
    const hora = fechaActual.getHours().toString();
    const minutos = fechaActual.getMinutes().toString();
    const segundos = fechaActual.getSeconds().toString();
    this.fecha = dia + '/' + mes + '/' + anio;
    this.hora = hora + ':' + minutos + ':' + segundos;

    const ret = this.fecha;

    return ret;
  }
}
