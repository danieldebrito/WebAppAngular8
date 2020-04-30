import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { CarritoItem } from 'src/app/class/carritoItem';

@Injectable({
  providedIn: 'root'
})
export class PedidoItemsService {

  public cantItems: number;

  constructor(public miHttp: BaseService) { }

  public Listar(): Observable<PedidoItem[]> {
    return this.miHttp.httpGetO<PedidoItem[]>('/pedidos_item/');
  }

  public Baja(id: number): Promise<object> {
    return this.miHttp.httpDeleteP('/pedidos_item/' + '"' + id + '"');
  }

  public TraerUno(id: string): Observable<PedidoItem> {
    return this.miHttp.httpGetO<PedidoItem>('/pedidos_item/' + '"' + id + '"');
  }

  public traerItemsClienteAbierto(id: string): Observable<PedidoItem[]> {
    return this.miHttp.httpGetO<PedidoItem[]>('/pedidos_item/clienteAbierto/' + '"' + id + '"');
  }

  public traerItemsCliente(id: string): Observable<PedidoItem[]> {
    return this.miHttp.httpGetO<PedidoItem[]>('/pedidos_item/cliente/' + '"' + id + '"');
  }

  public Alta(
    idPedido: number,
    idCliente: string,
    idArticulo: string,
    cantidad: number,
    precio_lista: number
  ): Promise<object> {
    const request: object = {
      idPedido,
      idCliente,
      idArticulo,
      cantidad,
      precio_lista
    };
    return this.miHttp.httpPostP('/pedidos_item/', request);
  }  // alta

  public Update(
    idPedidoItem: number,
    idPedido: number,
    idCliente: string,
    idArticulo: string,
    cantidad: number,
    precio_lista: number
  ): Promise<object> {
    const request: object = {
      idPedidoItem,
      idPedido,
      idCliente,
      idArticulo,
      cantidad,
      precio_lista,

    };
    return this.miHttp.httpPostP('/pedidos_item/update', request);
  }

  public cierraItems(idPedido: number, idCliente: string): Promise<object> {
    const request: object = {
      idPedido,
      idCliente
    };
    return this.miHttp.httpPostP('/pedidos_item/updateItems/', request);
  }

  public Subtotal(
    idCliente: string,
    idPedido: number
  ): Promise<object> {
    const request: object = {
      idCliente,
      idPedido
    };
    return this.miHttp.httpPostP('/pedidos_item/subtotal', request);
  }
}
