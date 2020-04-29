import { Component, OnInit, Output, Input } from '@angular/core';

import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { CarritoItemsService } from 'src/app/services/firebase/carrito-items.service';

import { CarritoItem } from 'src/app/class/carritoItem';
import { Pedido } from 'src/app/class/pedido';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.css']
})
export class PedidoDetalleComponent implements OnInit {

  @Output() showValue = new EventEmitter();
  public show: boolean;



  constructor(
    private pedidosService: PedidosService,
    private carritoItemsService: CarritoItemsService
  ) { }

  cambiaVista() {
    this.show = !this.show;
  }

  ngOnInit() {
  }

}
