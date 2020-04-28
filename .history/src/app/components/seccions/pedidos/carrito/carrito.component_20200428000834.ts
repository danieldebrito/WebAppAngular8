import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// class
import { Articulo } from 'src/app/class/articulo';
import { Cliente } from 'src/app/class/cliente';
import { CarritoItem } from 'src/app/class/carritoItem';
import { Pedido } from 'src/app/class/pedido';

// services
import { AuthService } from 'src/app/services/clientes/auth.service';
// import { PedidoItemsService } from 'src/app/services/pedidos/pedido-items.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { ArticulosService } from 'src/app/services/catalogo/articulos.service';
import { SucursalesService } from 'src/app/services/clientes/sucursales.service';
import { ExpresosService } from 'src/app/services/expresos/expresos.service';

// firebase
import { CarritoItemsService } from 'src/app/services/firebase/carrito-items.service';
// import { PedidosService } from 'src/app/services/firebase/pedidos.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public articulo: Articulo;
  public sucursales = [];
  public expresos = [];
  public cantidad: number;

  public expresoSelected: string;   // opcion elegida en select
  public idExpresoSelected;
  public sucursalSelected: string; // opcion elegida en select
  public idSucursalSelected;

  public clienteLogueado: Cliente;
  public observaciones = '';

  public subtotal: number;
  public hoy = Date.now();
  public carritoItems: CarritoItem[] = [];  // listado de items del carrito
  public fileName = 'ExcelSheet.xlsx';
  public pedido = {} as Pedido;

  constructor(
    // private pedidoItemServ: PedidoItemsService,
    public pedidosService: PedidosService,
    public artService: ArticulosService,
    private sucursalesService: SucursalesService,
    private expresosService: ExpresosService,
    private authService: AuthService,
    private toastr: ToastrService,
    private carritoItemsService: CarritoItemsService,
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

  public scrollTop() {
    window.scroll(0, 0);
  }

  public getSubtotal(): any {
    this.subtotal = 0;
    this.carritoItems.forEach(element => {
      this.subtotal += (element.precioLista * element.cantidad);
    });
  }

  // para traer el texto del text area //
  public doTextareaValueChange(event) {
    try {
      this.observaciones = event.target.value;
    } catch (e) {
      console.log('could not set textarea-value');
    }
  }


  // EXCEL  ///////////////////////////////////////////////////////////////////////////////////

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

// PEDIDOS ////////////////////////////////////////////////////////////////////////////

    public addPedido() {

alert(
  'id sucursal' + this.idSucursalSelected + ' ' +
  'id cliente' + this.clienteLogueado.idCliente + ' ' +
  'id expreso' + this.idExpresoSelected + ' ' +
  'estado' + 'abierto' + ' ' +
  'fecha' + this.hoy + ' ' +
  'descuento' + this.clienteLogueado.idDescuento + ' ' +
  'subtotal' + this.getSubtotal() + ' ' +
  'observ' + this.observaciones
);

      /*
      this.pedidosService.Alta(
        this.idSucursalSelected,
        this.clienteLogueado.idCliente,
        this.idExpresoSelected,
        'abierto',
        this.hoy,
        this.clienteLogueado.idDescuento,
        this.getSubtotal(),
        this.observaciones
      ).then(
        response => {
          console.log('se genero el pedido nro => ' + response);  // tiro un mensajito
          this.toastr.success('Pedido Generado', 'juntas MEYRO');
        }
      ).catch(
        error => {
          console.error('ERROR DEL SERVIDOR', error);
        }
      );*/

      // this.getPedidoItems();  // recargo la lista de items, quedaria vacia.
    }

  // FIREBASE CARRITO ITEMS ///////////////////////////////////////////////////////////////////////

  public async getCarritoItems() {

    (await this.carritoItemsService.getCarritoItems()).subscribe(elements => {
      this.carritoItems = elements;
      this.getSubtotal();
    });
  }

  public async getCarritoItemsClienteAbiertos() {
    (await this.carritoItemsService.getCarritoItems()).subscribe(elements => {
      elements.forEach(element => {
        if (element.idPedido === '-1' && element.idCliente === this.clienteLogueado.idCliente) {
          this.carritoItems.push(element);
        }
      });
      this.carritoItems.sort((a: CarritoItem, b: CarritoItem) => a.idArticulo.localeCompare(b.idArticulo));
      this.getSubtotal();
    });
  }


  public deleteCarritoItem(carritoItem) {
    this.carritoItemsService.deleteCarritoItem(carritoItem);
    this.getSubtotal();
  }

  updateCantidadCarritoItem(item: CarritoItem, event: any) {
    item.cantidad = event.target.value;
    this.carritoItemsService.updateCarritoItem(item);
  }

  updateidPedidoCarritoItem(item: CarritoItem, idPedido: string) {
    item.idPedido = idPedido;
    this.carritoItemsService.updateCarritoItem(item);
  }

  // FIREBASE PEDIDOS ///////////////////////////////////////////////////////////////////////////

  /*
  public getPedidos(idCliente) {
    this.pedidosService.getPedidos().subscribe(pedidos => {
    });
  }

  public addPedido() {
    this.SeleccionaSucursaldeHTML();

    this.pedido.estado = 'abierto';
    this.pedido.fecha = Date.now();
    this.pedido.idCliente = this.clienteLogueado.idCliente;
    this.pedido.idDescuento = this.clienteLogueado.idDescuento;
    this.pedido.idExpreso = this.idExpresoSelected;
    this.pedido.idSucursal = this.idSucursalSelected;
    this.pedido.observaciones = this.observaciones;

    this.pedidosService.addPedido(this.pedido);

      this.carritoItems.forEach( element => {
        this.updateidPedidoCarritoItem(element, idPedido);
      });
      
  }

  public deletePedido(pedido) {
    this.pedidosService.deletePedido(pedido);
  }

  updatePedido(pedido) {

    // item.cantidad = event.target.value;

    this.pedidosService.updatePedido(pedido);
  }
  */

  // ON INIT  ///////////////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.getCarritoItems();
    this.listaSucursalesCliente();
    this.listarExpresosCliente();
    this.scrollTop();
  }
}
