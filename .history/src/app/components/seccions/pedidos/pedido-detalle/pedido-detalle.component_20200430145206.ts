import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
// class
import { CarritoItem } from 'src/app/class/carritoItem';
import { Pedido } from 'src/app/class/pedido';
import { Cliente } from 'src/app/class/cliente';
// services
import { AuthService } from 'src/app/services/clientes/auth.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { CarritoItemsService } from 'src/app/services/firebase/carrito-items.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.css']
})
export class PedidoDetalleComponent implements OnInit {

  @Output() showValue = new EventEmitter();
  @Input() idPedido: string;

  public showDetail = false;
  public carritoItems: CarritoItem[] = [];
  public pedido: Pedido = {};
  public clienteLogueado: Cliente;

  public fileName = 'MEYRO_pedido' + this.idPedido + '.xlsx';


  constructor(
    private authService: AuthService,
    private carritoItemsService: CarritoItemsService,
    private pedidosService: PedidosService
  ) {
    this.clienteLogueado = this.authService.getIdentityLocalStorage();
  }

  public async getCarritoItems(idPedido) {
    (await this.carritoItemsService.getCarritoItems()).subscribe(elements => {
      this.carritoItems = elements.filter(item => item.idCliente === this.clienteLogueado.idCliente && item.idPedido === idPedido);
    });
  }

  public getPedido(idPedido) {
    this.pedidosService.TraerUno(idPedido).subscribe(response => {
      this.pedido = response;
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
    this.showValue.emit();
  }

  public scrollTop() {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.getCarritoItems(this.idPedido);
    this.getPedido(this.idPedido);
    this.scrollTop();
  }
}
