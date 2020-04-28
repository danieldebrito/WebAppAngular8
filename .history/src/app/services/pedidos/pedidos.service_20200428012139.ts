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

  public Baja(id: number): Promise<object> {
    return this.miHttp.httpDeleteP('/pedidos/' + '"' + id + '"');
  }

  public TraerUno(id: string): Observable<Pedido> {
    return this.miHttp.httpGetO<Pedido>('/pedidos/' + '"' + id + '"');
  }

  public Alta(
    // idPedido: number,
    idClienteSucursal: string,
    idCliente: string,
    idExpreso: string,
    estado: string,
    fecha: number,
    idDescuento: string,
    subtotalNeto: number,
    observaciones: string
  ): Promise<object> {
    const request: object = {
    // idPedido: number,
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
    fecha: number  ,
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
    alert('hola');
    return this.miHttp.httpGetO<Pedido>('/pedidos/abierto/' + '"' + idCliente + '"' );
  } // pedido de un mismo cliente abierto


  /**
   * lista todos los pedidos de un cliente
   */
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
    this.fecha = anio + '/' + mes + '/' + dia;
    this.hora = hora + ':' + minutos + ':' + segundos;

    const ret = this.fecha;

    return ret;
  }
}
