import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExpresosService } from 'src/app/services/expresos/expresos.service';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { SucursalesService } from 'src/app/services/clientes/sucursales.service';
import { Pedido } from 'src/app/class/pedido';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  @Input() pedido: Pedido;
  @Output() showValue = new EventEmitter();


  public showDetail = false;

  public expresoNombre;
  public direccion;

  constructor(
    private expresosService: ExpresosService,
    private sucursalesService: SucursalesService,
    private clientesService: ClientesService
  ) { }

  public TraerExpreso(pedido: Pedido) {
    this.expresosService.TraerUno(pedido.idExpreso).subscribe(response => {
      this.expresoNombre = response.nombre;
    },
      error => {
        console.error(error);
      });
  }

  public TraerDireccion(pedido: Pedido) {
    this.sucursalesService.TraerUno(pedido.idClienteSucursal).subscribe(response => {
      this.direccion = response.calle + response.numero + response.localidad + response.provincia;
    },
      error => {
        console.error(error);
      });
  }

  cambia(pedido: Pedido) {
    this.showDetail = !this.showDetail;
    this.showValue.emit(pedido);
  }

  ngOnInit() {
    this.TraerDireccion(this.pedido);
    this.TraerExpreso(this.pedido);
   }
}
