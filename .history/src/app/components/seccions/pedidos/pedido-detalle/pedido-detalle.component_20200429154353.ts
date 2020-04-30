import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
// class
import { CarritoItem } from 'src/app/class/carritoItem';
import { Pedido } from 'src/app/class/pedido';
import { Cliente } from 'src/app/class/cliente';
// services
import { AuthService } from 'src/app/services/clientes/auth.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { CarritoItemsService } from 'src/app/services/firebase/carrito-items.service';

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
  public pedido: Pedido;
  public clienteLogueado: Cliente;

  constructor(
    private authService: AuthService,
    private carritoItemsService: CarritoItemsService,
    private pedidosService: PedidosService
  ) {
    this.clienteLogueado = this.authService.getIdentityLocalStorage();
  }

  public getCarritoItems(idPedido) {
    this.carritoItemsService.getCarritoItems().subscribe(elements => {
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

  cambia() {
    this.showValue.emit();
  }

  ngOnInit() {
  }

}
