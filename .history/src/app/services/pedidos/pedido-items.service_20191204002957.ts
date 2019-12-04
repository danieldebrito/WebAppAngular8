import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { PedidoItem } from 'src/app/class/pedidoItem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoItemsService {

  constructor(public miHttp: BaseService) { }

  public Listar(): Observable<PedidoItem[]> {
    return this.miHttp.httpGetO<PedidoItem[]>('/pedidos_item/');
  }

  public Baja(id: string): Promise<object> {
    return this.miHttp.httpDeleteP('/pedidos_item/' +  id );
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
    id_cliente: string,
    id_pedido: string,
    id_articulo: string,
    cantidad: number,
    estado: string
  ): Promise<Object> {
    const request: Object = {
      id_cliente: id_cliente,
      id_pedido: id_pedido,
      id_articulo: id_articulo,
      cantidad: cantidad,
      estado: estado
    };
    return this.miHttp.httpPostP('/pedidos_item/', request);
  }  // alta

  public Update(
    id_pedido_item: number,
    id_cliente: string,
    id_pedido: string,
    id_articulo: string,
    cantidad: number,
    estado: string
  ): Promise<object> {
    const request: object = {
      id_pedido_item: id_pedido_item,
      id_cliente: id_cliente,
      id_pedido: id_pedido,
      id_articulo: id_articulo,
      cantidad: cantidad,
      estado: estado
    };
    return this.miHttp.httpPostP('/pedidos_item/update', request);
  }

  public cierraItems(id_pedido: number, id_cliente: string): Promise<object> {
    const request: object = {
      id_pedido: id_pedido,
      id_cliente: id_cliente
    };
    return this.miHttp.httpPostP('/pedidos_item/updateItems/', request);
  }
}
