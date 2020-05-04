import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/clientes/auth.service';
import { ExpresosService } from 'src/app/services/expresos/expresos.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { SucursalesService } from 'src/app/services/clientes/sucursales.service';

import { Pedido } from 'src/app/class/pedido';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

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
    private expresosService: ExpresosService,
    private sucursalesService: SucursalesService
  ) {
    this.idCliente = this.authService.getIdentityLocalStorage().idCliente;
    this.p = 1;
  }

  public ListarPedidosCliente() {
    this.pedidosService.Listar().subscribe(pedidos => {
      this.pedidos = pedidos;

      this.pedidos.map( item => {
        this.pedido = item;
        this.TraerDireccion(item);
      });
    });
  }

  public async traerPedidoPorID(id) {
    this.pedidosService.TraerUno(id).subscribe( response => {
      this.pedido = response;

      this.TraerExpreso(this.pedido.idExpreso);
      this.TraerDireccion(this.pedido);

    },
    error => {
      console.error(error);
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

  public async TraerDireccion(pedido: Pedido) {
    this.sucursalesService.TraerUno(pedido.idClienteSucursal).subscribe( async response  => {
       this.direccion =  response.calle + response.numero + response.localidad + response.provincia;
    });
  }

  cambiaVista() {
    this.showDetail = !this.showDetail;
  }

  cambia(idPedido) {
    this.idPedido = idPedido;
    this.showDetail = !this.showDetail;
  }

  public scrollTop() {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.ListarPedidosCliente();
    // this.traerPedidoPorID(this.);

    this.scrollTop();
  }
}
