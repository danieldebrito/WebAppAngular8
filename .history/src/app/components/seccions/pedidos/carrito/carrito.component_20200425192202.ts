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

import * as XLSX from 'xlsx';


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

  public hoy = Date.now();

  public carritoItems: CarritoItem[];  // listado de items del carrito

  public fileName = 'ExcelSheet.xlsx';

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
    this.subtotal = 0;
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

  public exportexcel(): void {
    /* table id is passed over here */
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }



  // FIREBASE  ///////////////////////////////////////////////////////////////////////////////////

  public getCarritoItems() {
    this.carritoItemsService.getCarritoItems().subscribe(carritoItems => {
      this.carritoItems = carritoItems;
      this.getSubtotal();
    });
  }

  public getSubtotal() {
    this.subtotal = 0;
    this.carritoItems.forEach(element => {
      this.subtotal += (element.precioLista * element.cantidad);
    });
  }

  public deleteCarritoItem(event, carritoItem) {
    this.carritoItemsService.deleteCarritoItem(carritoItem);
    this.getSubtotal();
  }

  updateCantidadCarritoItem(item: CarritoItem, event: any) {
    item.cantidad = event.target.value;
    this.carritoItemsService.updateCarritoItem(item);
  }

  public scrollTop() {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.getCarritoItems();
    this.listaSucursalesCliente();
    this.listarExpresosCliente();
    this.scrollTop();

    // this.SeleccionaSucursaldeHTML();

  }
}
