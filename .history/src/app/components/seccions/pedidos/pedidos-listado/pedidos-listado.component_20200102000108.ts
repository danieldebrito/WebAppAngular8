import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { AuthService } from 'src/app/services/clientes/auth.service';

import { Pedido } from 'src/app/class/pedido';

@Component({
  selector: 'app-pedidos-listado',
  templateUrl: './pedidos-listado.component.html',
  styleUrls: ['./pedidos-listado.component.css']
})
export class PedidosListadoComponent implements OnInit {

  public idCliente: string;
  public pedidosCliente: Pedido[];

  constructor(
    private pedidosService: PedidosService,
    private authService: AuthService
  ) {
    this.idCliente = this.authService.getIdentityLocalStorage().id;
  }

  public ListarPedidosCliente() {
    this.pedidosService.ListarPedidosCliente(this.idCliente).subscribe(response => {
      this.pedidosCliente = response;
    },
      error => {
        console.error(error);
      });
  }

  ngOnInit() {
    this.ListarPedidosCliente();
  }

}
