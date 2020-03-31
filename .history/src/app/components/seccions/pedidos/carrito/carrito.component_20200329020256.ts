import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// class
import { PedidoItem } from 'src/app/class/pedidoItem';
import { Articulo } from 'src/app/class/articulo';
import { Cliente } from 'src/app/class/cliente';
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
  public idSucursalSelected;

  public idCliente: string;
  public cliente: Cliente;
  public observaciones: string;

  constructor(
    private pedidoItemServ: PedidoItemsService,
    public artService: ArticulosService,
    public pedidosService: PedidosService,
    private sucursalesService: SucursalesService,
    private expresosService: ExpresosService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.idCliente = this.authService.getIdentityLocalStorage().idCliente;
    this.cliente = this.authService.getIdentityLocalStorage();
  }

  /**
   * trae los items que tengan el idPedido = -1 y sean del cliente en sesion, para carcar en el carrito
   */
  public ListarItemsAbiertos() {
/*
    this.pedidoItemServ.traerItemsClienteAbierto(this.idCliente).subscribe(response => {

      this.pedidoItems = response;

      this.cuentaCantItems();
    },
      error => {
        console.error(error);
      });*/
  }

  public LimpiarListaDeItems() {
    this.pedidoItems = [];
  }

  /**
   * cuenta cantidad de items cargados en carrito
   */
  public cuentaCantItems() {
    this.pedidoItemServ.cantItems = this.pedidoItems.length;
  }

  /**
   *
   * @param id de la entidad
   * borra un item del carrito mediante id
   */
  public borrarItem(id: number) {
    this.pedidoItemServ.Baja(id).then(
      response => {
        this.ListarItemsAbiertos();
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
      this.idSucursalByName(this.sucursalSelected);
      return response;
    });
  }

  /**
   * LISTA los expresos todos!!!
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
   * LISTA los expresos POR CLIENTE!!!!!
   * debe seleccionar uno para cerrar el pedido.
   */
  listaExpresosPorCliente() {
    this.expresosService.ListarPorCliente(this.idCliente).subscribe(response => {
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
        this.LimpiarListaDeItems();
        this.toastr.success('Pedido Generado', 'juntas MEYRO');
      }
    ).catch(
      error => {
        console.error('ERROR DEL SERVIDOR', error);
      }
    );
    // this.ListarItemsAbiertos();  // recargo la lista de items, quedaria vacia.

  }

  public updateItem(idPedidoItem, idPedido, idCliente, idArticulo, cantidad) {
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
    this.idSucursalByName(this.sucursalSelected);
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

  public idSucursalByName(name: string) {
    this.sucursalesService.ReadByName(name).subscribe(response => {

      this.idSucursalSelected = response.idSucursal;

      return response.idSucursal;
    },
      error => {
        console.error(error);
      });
  }

  ngOnInit() {
    this.ListarItemsAbiertos();
    this.listaSucursalesCliente();
    // this.listaExpresos();
    this.listaExpresosPorCliente();
    this.cuentaCantItems();
    this.SeleccionaSucursaldeHTML();
  }
}
