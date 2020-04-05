import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// class
import { Articulo } from 'src/app/class/articulo';
import { Cliente } from 'src/app/class/cliente';
import { CarritoItem } from 'src/app/class/carritoItem';

// services
import { AuthService } from 'src/app/services/clientes/auth.service';
// import { PedidoItemsService } from 'src/app/services/pedidos/pedido-items.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { ArticulosService } from 'src/app/services/catalogo/articulos.service';
import { SucursalesService } from 'src/app/services/clientes/sucursales.service';
import { ExpresosService } from 'src/app/services/expresos/expresos.service';

// firebase
import { CarritoItemsService } from 'src/app/services/firebase/carrito-items.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public articulo: Articulo;
  // public pedidoItems: PedidoItem[] = [];
  public sucursales = [];
  public expresos = [];
  public cantidad: number;

  public expresoSelected: string;   // opcion elegida en select
  public idExpresoSelected;
  public sucursalSelected: string; // opcion elegida en select
  public idSucursalSelected;

  // public idCliente: string;
  public clienteLogueado: Cliente;
  public observaciones: string;

  public subtotal: number;

  public carritoItems: CarritoItem[];  // listado de items del carrito

  constructor(
    //    private pedidoItemServ: PedidoItemsService,
    public artService: ArticulosService,
    public pedidosService: PedidosService,
    private sucursalesService: SucursalesService,
    private expresosService: ExpresosService,
    private authService: AuthService,
    private toastr: ToastrService,
    public carritoItemsService: CarritoItemsService
  ) {
    this.clienteLogueado = this.authService.getIdentityLocalStorage();
  }


  /**
   * LISTA las sucursales del cliente en sesion
   * debe seleccionar una para cerrar el pedido.
   */
  listaSucursalesCliente() {
    this.sucursalesService.ListarPorCliente(this.clienteLogueado.idCliente).subscribe(response => {

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
    this.expresosService.ListarPorCliente(this.clienteLogueado.idCliente).subscribe(response => {
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
      this.clienteLogueado.idCliente,
      this.idSucursalSelected,
      this.idExpresoSelected,
      'cerrado',
      this.pedidosService.getfecha(),
      'obs.' // this.observaciones
    ).then(
      response => {
        this.CerrarItems(response);  // en el response tengo el id del pedido, lo paso como parametro.
        console.log('se genero el pedido nro => ' + response);  // tiro un mensajito
        this.toastr.success('Pedido Generado', 'juntas MEYRO');
      }
    ).catch(
      error => {
        console.error('ERROR DEL SERVIDOR', error);
      }
    );
    // this.getPedidoItems();  // recargo la lista de items, quedaria vacia.

  }

  public CerrarItems(idPedido) { }

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



  // FIREBASE  ///////////////////////////////////////////////////////////////////////////////////

  public getCarritoItems() {
    this.carritoItemsService.getCarritoItems().subscribe(carritoItems => {
      this.carritoItems = carritoItems;

      carritoItems.forEach(element => {
        this.subtotal += element.precioLista * element.cantidad;

        console.log(  this.subtotal);
        console.log(    element.precioLista);
        console.log(    element.cantidad);
        console.log(element.precioLista * element.cantidad);

        // alert('subtotal ' + this.subtotal + 'precioLista * cantidad ' + element.precioLista * element.cantidad);

      });
    });
  }
  public deleteCarritoItem(event, carritoItem) {
    this.carritoItemsService.deleteCarritoItem(carritoItem);
  }

  public getSubtotal() {
    // this.getCarritoItems();
    this.carritoItems.forEach(element => {
      this.subtotal += element.precioLista * element.cantidad;
      alert('subtotal ' + this.subtotal + 'precioLista * cantidad ' + element.precioLista * element.cantidad);
    });
  }

  updateCantidadCarritoItem(item: CarritoItem, event: any) {
    item.cantidad = event.target.value;
    this.carritoItemsService.updateCarritoItem(item);
  }

  ngOnInit() {
    this.getCarritoItems();
    this.listaSucursalesCliente();
    this.listarExpresosCliente();
    // this.SeleccionaSucursaldeHTML();
    // this.getSubtotal();
  }
}
