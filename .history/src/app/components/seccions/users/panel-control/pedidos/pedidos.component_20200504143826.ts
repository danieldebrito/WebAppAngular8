import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExpresosService } from 'src/app/services/expresos/expresos.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
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
  public showBar = false;
  public idPedido;
  public expresoNombre;
  public direccion;
  public p: number;  // paginacion primer page

  constructor(
    private pedidosService: PedidosService,
    private expresosService: ExpresosService,
    private sucursalesService: SucursalesService,
    private clientesService: ClientesService
  ) { }

  public TraerExpreso(id: number) {
    this.expresosService.TraerUno(id).subscribe(response => {
      this.expresoNombre =  response.nombre;
    },
    error => {
      console.error(error);
    });
  }

  public TraerDireccion(pedido: Pedido) {
    this.sucursalesService.TraerUno(pedido.idClienteSucursal).subscribe( response  => {
       this.direccion =  response.calle + response.numero + response.localidad + response.provincia;
    });
  }

  cambiaVista() {
    this.showDetail = !this.showDetail;
  }

  cambia(idPedido) {
    this.idPedido = idPedido;
    this.showDetail = !this.showDetail;
    this.showValue.emit();
  }

  ngOnInit() {}
}
