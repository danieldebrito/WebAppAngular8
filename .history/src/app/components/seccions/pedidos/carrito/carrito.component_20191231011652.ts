import { Component, OnInit, DoCheck } from '@angular/core';

// class
import { PedidoItem } from 'src/app/class/pedidoItem';
import { Articulo } from 'src/app/class/articulo';
import { ClienteSucursal } from 'src/app/class/clienteSucursal';
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

  public expresoSelected: string;   // opcion elegida en select
  public idExpresoSelected;
  public sucursalSelected: string; // opcion elegida en select

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

  /**
   * trae los items que tengan el idPedido = -1 y sean del cliente en sesion
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
  listaSucursalesCliente() {
    this.sucursalesService.ListarPorCliente(this.idCliente).subscribe(response => {
      this.sucursales = response;
      this.sucursalSelected = this.sucursales[0].nombreSucursal;
      return response;
    });
  }

  /**
   * LISTA los expresos
   * debe seleccionar uno para cerrar el pedido.
   */
  listaExpresos() {
    this.expresosService.Listar().subscribe(response => {
      this.expresos = response;
      this.expresoSelected = this.expresos[0].nombre;
      this.idExpresoByName(this.expresoSelected);

      return response;
    });
  }

  /**
   * EN CONSTRUCCION
   * LA IDEA ES QUE CREE UN NUEVO PEDIDO TOMANDO LAS VARIABLES DE LA SESION DE USUARIO
   */

  public crearPedido() {

    this.idExpresoByName(this.expresoSelected);

    alert(
      ' expreso selected :  ' + this.expresoSelected +
      ' formula :  ' + this.idExpresoSelected +
      ' expreso selected :  ' + this.expresoSelected
    );


/*

    alert(
      'id cliente' + this.idCliente +
      'id sucursal' + 0 +
      'expreso' + this.idExpresoByName(this.expresoSelected) +
      'escato' + 'abierto' +
      'fecha' + this.pedidosService.getfecha() +
      'obs' + 'hacer observ.' // this.observaciones
    );

*/

    /*
    this.pedidosService.Alta(
      this.idCliente,
      0,
      this.idExpresoByName(this.expresoSelected),
      'abierto',
      this.pedidosService.getfecha(),
      'hacer observ.' // this.observaciones
    ).then(
      response => {
        this.cerrarPedido(response);
        // return response;
        alert(response);
      }
    ).catch(
      error => {
        console.error('ERROR DEL SERVIDOR', error);
      }
    );*/
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

  CambiaSucursalExpreso() {
    this.idExpresoByName(this.expresoSelected);
  }

  public idExpresoByName(name: string) {
    this.expresosService.ReadByName(name).subscribe(response => {

      this.idExpresoSelected = response.id_expreso;

      return response.id_expreso;
    },
      error => {
        console.error(error);
      });
  }

  ngOnInit() {
    this.listarPedidoAbierto();
    this.listaSucursalesCliente();
    this.listaExpresos();
    this.cuentaCantItems();
    this.idExpresoByName(this.expresoSelected);
  }

  DoCheck() {
    // this.identity = this.authService.getIdentityLocalStorage();
  }
}
