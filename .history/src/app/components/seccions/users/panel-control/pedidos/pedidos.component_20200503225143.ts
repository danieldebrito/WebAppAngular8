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
  public pedidosCliente: Pedido[] = [];
  public showDetail = false;
  // public idPedido: string;
  public showBar = false;

  public expresoNombre;
  public direccion;
  public pedido: Pedido;

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
      this.pedidosCliente = pedidos;
      this.pedidosCliente.map( item => {
        this.pedido = item;
        this.TraerExpreso(item.idExpreso);
        this.TraerDireccion(item.idClienteSucursal);

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

  public TraerDireccion(id: string) {
    this.sucursalesService.TraerUno(id).subscribe( response  => {
       this.direccion = response.calle + response.numero + response.localidad + response.provincia;
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
    this.scrollTop();
  }
}
