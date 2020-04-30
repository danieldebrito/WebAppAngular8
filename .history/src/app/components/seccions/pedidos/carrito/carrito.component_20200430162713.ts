import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// class
import { Articulo } from 'src/app/class/articulo';
import { Cliente } from 'src/app/class/cliente';
import { CarritoItem } from 'src/app/class/carritoItem';
import { ClienteSucursal } from 'src/app/class/clienteSucursal';
import { Expreso } from 'src/app/class/expreso';

// services
import { AuthService } from 'src/app/services/clientes/auth.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
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
  public sucursal: ClienteSucursal; // opcion elegida en select
  public idSucursalSelected;

  public clienteLogueado: Cliente;
  public observaciones = '';

  public subtotal = 0;
  public hoy: string;
  public carritoItems: CarritoItem[] = [];  // listado de items del carrito
  public fileName = 'ExcelSheet.xlsx';

  constructor(
    private pedidosService: PedidosService,
    private sucursalesService: SucursalesService,
    private expresosService: ExpresosService,
    private authService: AuthService,
    private toastr: ToastrService,
    private carritoItemsService: CarritoItemsService,
  ) {
    this.clienteLogueado = this.authService.getIdentityLocalStorage();
    this.subtotal = 0;
  }

  listaSucursalesCliente() {
    this.sucursalesService.ListarPorCliente(this.clienteLogueado.idCliente).subscribe(response => {

      this.sucursales = response;
      /*
      this.sucursalSelected = this.sucursales[0].nombreSucursal;
      this.getSucursalByName(this.sucursalSelected);
      return response;*/
    });
  }

  listarExpresosCliente() {
    this.expresosService.ListarPorCliente(this.clienteLogueado.idCliente).subscribe(response => {
      this.expresos = response;
      this.expresoSelected = this.expresos[0].nombre;
      this.idExpresoByName(this.expresoSelected);

      return response;
    });
  }

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
    // this.getSucursalByName(this.sucursalSelected);
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
    if (this.carritoItems.length !== 0) {
      this.subtotal = this.carritoItems.map(item => item.cantidad * item.precioLista).reduce((ant, prev) => ant + prev);
    } else {
      this.subtotal = 0;
    }
  }

  getfecha() {
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString();
    const mes = (fechaActual.getMonth() + 1).toString();
    const anio = fechaActual.getFullYear().toString();
    const hora = fechaActual.getHours().toString();
    const minutos = fechaActual.getMinutes().toString();
    return dia + '/' + mes + '/' + anio + ' - ' + hora + ':' + minutos;
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

  public async addPedido() {
    this.pedidosService.Alta(
      '',
      this.clienteLogueado.idCliente,
      '',
      'abierto',
      this.pedidosService.getfecha(),
      this.clienteLogueado.idDescuento,
      0,
      ''
    ).then(
      response => {
        console.log('se genero el pedido nro => ' + response);  // tiro un mensajito
        this.pedidosService.idPedido = response;  // guardo en el servicio el id
      }
    ).catch(
      error => {
        console.error('ERROR DEL SERVIDOR', error);
      }
    );
  }

  public async updatePedido() {
    this.pedidosService.Update(
      this.pedidosService.idPedido,
      this.sucursal.idSucursal,
      this.clienteLogueado.idCliente,
      this.idExpresoSelected,
      'enviado',
      this.getfecha(),
      this.clienteLogueado.idDescuento,
      this.subtotal,
      this.observaciones
    ).then(
      response => {
        console.log('se updateo el pedido nro => ' + response);  // tiro un mensajito
        // this.idPedido = response;
        this.toastr.success('Pedido Generado', 'juntas MEYRO');
      }
    ).catch(
      error => {
        console.error('ERROR DEL SERVIDOR', error);
      }
    );
  }

  public async getPedidoClienteAbierto() {
    this.pedidosService.traerpedidoAbierto(this.clienteLogueado.idCliente).subscribe(async response => {
      this.pedidosService.idPedido = response.idPedido;
    },
      error => {
        console.error(error);
      });
  }

  public cerrarPedido() {
    if ( this.carritoItems.length !== 0 ) {
      this.updatePedido();
      this.updateidPedidoCarritoItems(this.pedidosService.idPedido);
      this.subtotal = 0;
    } else {
      this.toastr.error('CARRITO VACIO', 'juntas MEYRO');
    }

  }

  // FIREBASE CARRITO ITEMS ///////////////////////////////////////////////////////////////////////

  public async getCarritoItems() {

    (await this.carritoItemsService.getCarritoItems()).subscribe(elements => {
      this.carritoItems = elements.filter(item => item.idCliente === this.clienteLogueado.idCliente && item.idPedido === -1);
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

  public updateidPedidoCarritoItems(idPedido) {
    this.carritoItems.forEach(element => {
      if (element.idPedido === -1 && element.idCliente === this.clienteLogueado.idCliente) {
        element.idPedido = idPedido;
        this.carritoItemsService.updateCarritoItem(element);
      }
    });
  }

  // ON INIT  ///////////////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.getCarritoItems();
    this.getPedidoClienteAbierto();
    this.listaSucursalesCliente();
    this.listarExpresosCliente();
    this.hoy = this.pedidosService.getfecha();
    this.scrollTop();
  }
}
