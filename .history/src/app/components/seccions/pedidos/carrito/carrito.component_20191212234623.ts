import { Component, OnInit, DoCheck } from '@angular/core';

// class
import { PedidoItem } from 'src/app/class/pedidoItem';
import { Pedido } from 'src/app/class/pedido';
import { Articulo } from 'src/app/class/articulo';
import { Cliente } from 'src/app/class/cliente';
import { Sucursal } from 'src/app/class/sucursal';
import { Expreso } from 'src/app/class/expreso';

// services
import { AuthService } from 'src/app/services/clientes/auth.service';
import { PedidoItemsService } from 'src/app/services/pedidos/pedido-items.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { ArticulosService } from 'src/app/services/catalogo/articulos.service';
import { SucursalesService } from 'src/app/services/clientes/sucursales.service';
import { ExpresosService } from 'src/app/services/expresos/expresos.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public articulo: Articulo;
  public pedidoItems: PedidoItem[] = [];
  public sucursales = [];
  public expresos = [];
  public expreso: Expreso;   // opcion elegida en select
  public sucursal: Sucursal; // opcion elegida en select


  public idCliente: string;
  public observaciones: string;

  constructor(
    private pedidoItemServ: PedidoItemsService,
    public artService: ArticulosService,
    public pedidosService: PedidosService,
    private sucursalesService: SucursalesService,
    private expresosService: ExpresosService,

    private authService: AuthService
  ) {
    this.idCliente = this.authService.getIdentityLocalStorage().id;
  }

  public nuevoPedido() { }

  /**
   * trae los items que tengan el atributo estado = 'abierto' y sean del cliente en sesion
   */
  public listarPedidoAbierto() {
    this.pedidoItemServ.traerItemsClienteAbierto(this.idCliente).subscribe(response => {
      this.pedidoItems = response;
      this.cuentaCantItems();
    },
      error => {
        console.error(error);
      });
  }

  /**
   * cuenta cantidad de items en carrito
   */
  public cuentaCantItems() {
    this.pedidoItemServ.cantItems = this.pedidoItems.length;
  }

  /**
   *
   * @param id de la entidad
   * borra un item de la entidad mediante id
   */
  public borrarItem(id: string) {
    this.pedidoItemServ.Baja(id).then(
      response => {
        this.listarPedidoAbierto();
        return response;
      }
    ).catch(
      error => {
        console.error('ERROR DEL SERVIDOR', error);
      }
    );
  }

  /**
   * LISTA las sucursales del cliente en sesion
   * debe seleccionar una para cerrar el pedido.
   */
  listaPorCliente() {
    this.sucursalesService.ListarPorCliente(this.idCliente).subscribe(response => {
      this.sucursales = response;
    });
  }

  /**
   * LISTA los expresos
   * debe seleccionar uno para cerrar el pedido.
   */
  listaExpresos() {
    this.expresosService.Listar().subscribe(response => {
      this.expresos = response;
    });
  }

  /**
   * EN CONSTRUCCION
   * LA IDEA ES QUE CREE UN NUEVO PEDIDO TOMANDO LAS VARIABLES DE LA SESION DE USUARIO
   */

  public crearPedido() {
    this.pedidosService.Alta(
      this.idCliente,
      this.sucursal.id_sucursal,
      this.expreso.id_expreso,
      'abierto',
      this.pedidosService.getfecha(),
      this.observaciones
    ).then(
      response => {
        this.cerrarPedido(response);
        return response;
      }
    ).catch(
      error => {
        console.error('ERROR DEL SERVIDOR', error);
      }
    );
  }


  /**
   *   EN CONSTRUCCION CIERRA LOS ITEMS PARA ARMAR EL PEDIDO, CAMBIA ESTADO A CERRADO Y CARGA NRO DE PEDIDO
   * @param id_pedido => id de pedido
   * @param id_cliente => id de cliente
   */
  public cerrarPedido(idPedido) {
    this.pedidoItemServ.cierraItems(idPedido, this.idCliente).then(
      response => {
        return response;
      }
    ).catch(
      error => {
        console.error('ERROR DEL SERVIDOR', error);
      }
    );
  }

  ngOnInit() {
    this.listarPedidoAbierto();
    this.listaPorCliente();
    this.listaExpresos();
    this.cuentaCantItems();
  }

  DoCheck() {
    // this.identity = this.authService.getIdentityLocalStorage();
  }
}
