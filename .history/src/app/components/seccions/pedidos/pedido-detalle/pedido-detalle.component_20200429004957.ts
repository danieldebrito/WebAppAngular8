import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.css']
})
export class PedidoDetalleComponent implements OnInit {

  @Output() showValue = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

}
