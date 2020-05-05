import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
// class
import { CarritoItem } from 'src/app/class/carritoItem';
import { Pedido } from 'src/app/class/pedido';
import { Cliente } from 'src/app/class/cliente';

// services
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { CarritoItemsService } from 'src/app/services/firebase/carrito-items.service';
import { SucursalesService } from 'src/app/services/clientes/sucursales.service';
import { ExpresosService } from 'src/app/services/expresos/expresos.service';
import { ClientesService } from 'src/app/services/clientes/clientes.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.css']
})
export class PedidoDetalleComponent implements OnInit {

  @Output() showValue = new EventEmitter();
  @Input() idPedido: number;
  @Input() showBar: boolean;  // para que muestre u oculte la barra superior

  public showDetail = false;
  public carritoItems: CarritoItem[] = [];
  public pedido: Pedido = {};

  public cliente: Cliente;
  public expreso: string;
  public direccion: string;

  public fileName = 'MEYRO_pedido.xlsx';


  constructor(
    private sucursalesService: SucursalesService,
    private expresosService: ExpresosService,
    private carritoItemsService: CarritoItemsService,
    private clientesServide: ClientesService,
    private pedidosService: PedidosService
  ) { }

  public async getPedido(idPedido) {
    ( this.pedidosService.TraerUno(idPedido)).subscribe(async response => {
      this.pedido = response;

      this.TraerDireccion(response.idClienteSucursal);
      this.getExpreso(response.idExpreso);
      this.traerCliente(response.idCliente);
      this.getCarritoItems(response);
    },
      error => {
        console.error(error);
      });
  }

  public UpdateEstado(estado: string) {

    alert(this.idPedido);
    this.pedidosService.UpdateEstado(
      this.idPedido,
      estado
    ).then(
      response => {
        console.log('se updateo el pedido nro => ' + response);  // tiro un mensajito
      }
    ).catch(
      error => {
        alert(error);
        console.error('ERROR DEL SERVIDOR', error);
      }
    );
  }

  public async updatePedido() {
    this.pedidosService.Update(
      this.idPedido,
      this.pedido.idClienteSucursal,
      this.pedido.idCliente,
      '',
      'leido',
      '',
      this.pedido.idDescuento,
      0,
      ''
    ).then(
      response => {
        console.log('se updateo el pedido nro => ' + response);  // tiro un mensajito
        // this.idPedido = response;
        // this.toastr.success('Pedido Generado', 'juntas MEYRO');
      }
    ).catch(
      error => {
        console.error('ERROR DEL SERVIDOR', error);
      }
    );
  }

  public async getCarritoItems(pedido: Pedido) {
    (await this.carritoItemsService.getCarritoItems()).subscribe(elements => {
      this.carritoItems = elements.filter(item => item.idCliente === pedido.idCliente
        && item.idPedido === pedido.idPedido);
    });
  }

  /// cliente /////////////////////////////////////////////////////////////////

  public traerCliente(idCliente: string) {
    this.clientesServide.traerUno(idCliente).subscribe(response => {
      this.cliente = response;
    },
      error => {
        console.error(error);
      });
  }

  // expreso y sucursal //////////////////////////////////////////////////////

  public getExpreso(id: number) {
    this.expresosService.TraerUno(id).subscribe(response => {
      this.expreso = response.nombre;
    },
      error => {
        console.error(error);
      });
  }

  public TraerDireccion(id: string) {
    this.sucursalesService.TraerUno(id).subscribe(response => {
      this.direccion = response.calle + response.numero + response.localidad + response.provincia;
    },
      error => {
        console.error(error);
      });
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

  cambia() {
    this.showValue.emit({pedido: this.pedido});
  }

  public scrollTop() {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.getPedido(this.idPedido);
    this.scrollTop();
  }
}
