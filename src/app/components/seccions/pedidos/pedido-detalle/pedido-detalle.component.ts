import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.css']
})
export class PedidoDetalleComponent implements OnInit {

  @Output() showValue = new EventEmitter();
  public showDetail = false;

  constructor() { }

  cambia() {
    this.showValue.emit();
  }

  ngOnInit() {
  }

}
