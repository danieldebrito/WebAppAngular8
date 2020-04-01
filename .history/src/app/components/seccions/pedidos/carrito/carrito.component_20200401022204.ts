import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// class
import { PedidoItem } from 'src/app/class/pedidoItem';
import { Articulo } from 'src/app/class/articulo';
import { Cliente } from 'src/app/class/cliente';

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
  // public pedidoItemsLS: PedidoItem[] = [];
  public sucursales = [];
  public expresos = [];

  public expresoSelected: string;   // opcion elegida en select
  public idExpresoSelected;
  public sucursalSelected: string; // opcion elegida en select
  public idSucursalSelected;

  public idCliente: string;
  public cliente: Cliente;
  public observaciones: string;

  public subtotal: number;

  constructor(
    private pedidoItemServ: PedidoItemsService,
    public artService: ArticulosService,
    public pedidosService: PedidosService,
    private sucursalesService: SucursalesService,
    private expresosService: ExpresosService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.cliente = this.authService.getIdentityLocalStorage();
  }

  /**
   * trae los items que tengan el idPedido = -1
   * y sean del cliente en sesion
   */
  public getPedidoItems() {
    this.pedidoItemServ.traerItemsClienteAbierto(this.idCliente).subscribe(response => {
      this.pedidoItems = response;
      this.cuentaPedidoItems();
    },
      error => {
        console.error(error);
      });
  }

  /*
 * LEE LOS ARTICULOS CARGADOS EN EL CARRITO DEL LS
 * trae los items que tengan el idPedido = -1 y sean del cliente en sesion, para carcar en el carrito
 */
  /*
    public getPedidoItemsLS() {
      this.pedidoItemsLS = JSON.parse(localStorage.getItem('pedidoItemsLS'));
    }*/


  public cleanPedidoItems() {
    this.pedidoItems = [];
  }

  /**
   * cuenta cantidad de items cargados en carrito
   */
  public cuentaPedidoItems() {
    this.pedidoItemServ.cantItems = this.pedidoItems.length;
  }

  /**
   *
   * @param id de la entidad
   * borra un item del carrito mediante id
   */
  public deletePedidoItem(id: number) {
    this.pedidoItemServ.Baja(id).then(
      response => {
        this.getPedidoItems();
        return response;
      }
    ).catch(
      error => {
        console.error('ERROR DEL SERVIDOR', error);
      }
    );
  }

  /**
   * @param id de la entidad
   * borra un item del carrito mediante id
   */
  /*
    public deletePedidoItemLS(item: PedidoItem) {
  
      this.pedidoItemsLS.splice(this.pedidoItemsLS.indexOf(item), 1);  // borra de ls
      localStorage.setItem('pedidoItemsLS', JSON.stringify(this.pedidoItemsLS));
      this.deletePedidoItem(item.idPedidoItem);  // borra de la bd
    }*/

  /**
   * LISTA las sucursales del cliente en sesion
   * debe seleccionar una para cerrar el pedido.
   */
  listaSucursalesCliente() {
    this.sucursalesService.ListarPorCliente(this.idCliente).subscribe(response => {

      this.sucursales = response;
      this.sucursalSelected = this.sucursales[0].nombreSucursal;
      this.getSucursalByName(this.sucursalSelected);
      return response;
    });
  }

    /**
   * LISTA los expresos POR CLIENTE!!!!!
   * debe seleccionar uno para cerrar el pedido.
   */
  listarExpresosCliente() {
    this.expresosService.ListarPorCliente(this.idCliente).subscribe(response => {
      this.expresos = response;
      this.expresoSelected = this.expresos[0].nombre;
      this.idExpresoByName(this.expresoSelected);

      return response;
    });
  }

  /**
   * LISTA los expresos todos!!!
   * debe seleccionar uno para cerrar el pedido.
   */
  listarTodosExpresos() {
    this.expresosService.Listar().subscribe(response => {
      this.expresos = response;
      this.expresoSelected = this.expresos[0].nombre;
      this.idExpresoByName(this.expresoSelected);

      return response;
    });
  }




  /**
   * cierra el pedido, asignando a los items cargados en el carrito el nro de pedido, antes tiene -1
   * tambien al pedido le cambia el estado a cerrado
   */
  public CerrarPedido() {
    this.pedidosService.Alta(
      this.idCliente,
      this.idSucursalSelected,
      this.idExpresoSelected,
      'cerrado',
      this.pedidosService.getfecha(),
      'obs.' // this.observaciones
    ).then(
      response => {
        this.CerrarItems(response);  // en el response tengo el id del pedido, lo paso como parametro.
        console.log('se genero el pedido nro => ' + response);  // tiro un mensajito
        this.cleanPedidoItems();
        this.toastr.success('Pedido Generado', 'juntas MEYRO');
      }
    ).catch(
      error => {
        console.error('ERROR DEL SERVIDOR', error);
      }
    );
    // this.getPedidoItems();  // recargo la lista de items, quedaria vacia.

  }

  public updatePedidoItem(idPedidoItem, idPedido, idCliente, idArticulo, cantidad) {
    this.pedidoItemServ.Update(idPedidoItem, idPedido, idCliente, idArticulo, cantidad).then(
      response => {
        this.toastr.success('Cargado a Carrito', 'juntas MEYRO');
        return response;
      }
    ).catch(
      error => {
        console.error('ERROR DEL SERVIDOR, carrito component', error);
      }
    );
  }

  /**
   * EN CONSTRUCCION CIERRA LOS ITEMS PARA ARMAR EL PEDIDO, CAMBIA ESTADO A CERRADO Y CARGA NRO DE PEDIDO
   * @param id_pedido => id de pedido
   * @param id_cliente => id de cliente
   */
  public CerrarItems(idPedido) {
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

  SeleccionaSucursaldeHTML() {
    this.idExpresoByName(this.expresoSelected);
    this.getSucursalByName(this.sucursalSelected);
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

  public getSucursalByName(name: string) {
    this.sucursalesService.ReadByName(name).subscribe(response => {

      this.idSucursalSelected = response.idSucursal;

      return response.idSucursal;
    },
      error => {
        console.error(error);
      });
  }

  public getSubtotal() {
    this.pedidoItems.forEach(element => {
      this.subtotal += (element.precio_lista * element.cantidad);
    });
  }

  ngOnInit() {
    this.getPedidoItems();
    this.listaSucursalesCliente();
    this.listarExpresosCliente();
    this.cuentaPedidoItems();
    this.SeleccionaSucursaldeHTML();

    this.getSubtotal();

    // this.Subtotal(this.idCliente, -1);
  }
}



  
  /*public Subtotal(idCliente, idPedido) {
    this.pedidoItemServ.Subtotal(idCliente, idPedido).then(
      response => {
        this.subtotal = response;
        // this.subtotal.subtotal;
        alert(this.subtotal);


        return response;
      }
    ).catch(
      error => {
        console.error('ERROR DEL SERVIDOR, carrito component', error);
      }
    );
  }*/