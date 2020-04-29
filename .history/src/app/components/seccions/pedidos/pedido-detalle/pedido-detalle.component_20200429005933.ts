import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.css']
})
export class PedidoDetalleComponent implements OnInit {

  @Output() show = new EventEmitter();


  constructor() { }

  cambia() {
    this.show.emit();
  }

  ngOnInit() {
  }

}
