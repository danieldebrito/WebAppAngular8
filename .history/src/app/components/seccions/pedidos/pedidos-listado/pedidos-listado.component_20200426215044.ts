import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/clientes/auth.service';
import { ExpresosService } from 'src/app/services/expresos/expresos.service';
import { PedidosService } from 'src/app/services/firebase/pedidos.service';

import { Pedido } from 'src/app/class/pedido';

@Component({
  selector: 'app-pedidos-listado',
  templateUrl: './pedidos-listado.component.html',
  styleUrls: ['./pedidos-listado.component.css']
})
export class PedidosListadoComponent implements OnInit {

  public idCliente: string;
  public pedidosCliente: Pedido[] = [];

  constructor(
    private pedidosService: PedidosService,
    private authService: AuthService,
    private expresosService: ExpresosService
  ) {
    this.idCliente = this.authService.getIdentityLocalStorage().idCliente;
  }

  public ListarPedidosCliente() {
    this.pedidosService.getPedidos().subscribe(pedidos => {

      pedidos.forEach(element => {
        if ( element.idCliente === this.idCliente ) {
          this.pedidosCliente.push(element);
        }
      });
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
