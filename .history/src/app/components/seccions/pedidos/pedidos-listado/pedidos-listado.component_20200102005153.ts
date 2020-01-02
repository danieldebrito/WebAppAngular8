import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { AuthService } from 'src/app/services/clientes/auth.service';
import { ExpresosService } from 'src/app/services/expresos/expresos.service';

import { Pedido } from 'src/app/class/pedido';

@Component({
  selector: 'app-pedidos-listado',
  templateUrl: './pedidos-listado.component.html',
  styleUrls: ['./pedidos-listado.component.css']
})
export class PedidosListadoComponent implements OnInit {

  public idCliente: string;
  public pedidosCliente: Pedido[];
  public expresoNombre: string;

  constructor(
    private pedidosService: PedidosService,
    private authService: AuthService,
    private expresosService: ExpresosService
  ) {
    this.idCliente = this.authService.getIdentityLocalStorage().id;
  }

  public ListarPedidosCliente() {
    this.pedidosService.ListarPedidosCliente(this.idCliente).subscribe(response => {
      this.pedidosCliente = response;
      this.expresoNombre = this.TraerExpreso(response.idExpreso);

    },
      error => {
        console.error(error);
      });
  }

  public TraerExpreso(id: string) {
    this.expresosService.TraerUno(id).subscribe(response => {
      return response.nombre;
    },
    error => {
      console.error(error);

    });
  }

  ngOnInit() {
    this.ListarPedidosCliente();
  }

}
