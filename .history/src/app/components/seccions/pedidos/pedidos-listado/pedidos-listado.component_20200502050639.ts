import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/clientes/auth.service';
import { ExpresosService } from 'src/app/services/expresos/expresos.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

import { Pedido } from 'src/app/class/pedido';

@Component({
  selector: 'app-pedidos-listado',
  templateUrl: './pedidos-listado.component.html',
  styleUrls: ['./pedidos-listado.component.css']
})
export class PedidosListadoComponent implements OnInit {

  public idCliente: string;
  public pedidosCliente: Pedido[] = [];
  public showDetail = false;
  public idPedido: string;

  public expresoNombre;

  constructor(
    private pedidosService: PedidosService,
    private authService: AuthService,
    private expresosService: ExpresosService
  ) {
    this.idCliente = this.authService.getIdentityLocalStorage().idCliente;
  }

  public ListarPedidosCliente() {
    this.pedidosService.ListarPedidosCliente(this.idCliente).subscribe(pedidos => {
      this.pedidosCliente = pedidos;
      this.pedidosCliente.map( item => {
        this.TraerExpreso(item.idExpreso);
      });
    });
  }

  public TraerExpreso(id: number) {
    this.expresosService.TraerUno(id).subscribe(response => {
      this.expresoNombre =  response.nombre;
    },
    error => {
      console.error(error);
    });
  }

  cambiaVista() {
    this.showDetail = !this.showDetail;
  }

  cambia(idPedido) {
    this.idPedido = idPedido;
    this.showDetail = !this.showDetail;
  }

  ngOnInit() {
    this.ListarPedidosCliente();
    // this.TraerExpreso(0);
  }
}
