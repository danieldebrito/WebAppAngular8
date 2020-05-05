import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/clientes/auth.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { Pedido } from 'src/app/class/pedido';

@Component({
  selector: 'app-pedidoslistado',
  templateUrl: './pedidoslistado.component.html',
  styleUrls: ['./pedidoslistado.component.css']
})
export class PedidoslistadoComponent implements OnInit {

  public idCliente: string;

  public pedidos: Pedido[] = [];
  public idPedido;
  public pedido: Pedido;

  public showDetail = false;
  public showBar = false;

  public expresoNombre;
  public direccion;

  public p: number;  // paginacion primer page

  constructor(
    private pedidosService: PedidosService,
    private authService: AuthService,
  ) {
    this.idCliente = this.authService.getIdentityLocalStorage().idCliente;
    this.p = 1;
  }

  public ListarPedidos() {
    this.pedidosService.Listar().subscribe(pedidos => {
      this.pedidos = pedidos;
    });
  }

  cambiaVista(event) {
    this.showDetail = !this.showDetail;
    this.pedido = event.pedido;
  }

  public scrollTop() {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.ListarPedidos();
    this.scrollTop();
  }
}
