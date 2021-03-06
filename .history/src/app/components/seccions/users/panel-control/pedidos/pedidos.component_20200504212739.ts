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

  public clase: string;

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

  public claseButton(estado) {
    switch (estado) {
      case 'En Curso':
        this.clase = 'btn btn-secondary';
        alert(this.clase);
        break;
      case 'Enviado':
        this.clase = 'btn btn-secondary';
        alert(this.clase);
        break;
      case 'Leido':
        this.clase = 'btn btn-success';
        alert(this.clase);
        break;
      case 'Retenido':
        this.clase = 'btn btn-warning';
        alert(this.clase);
        break;
      case 'Anulado':
        this.clase = 'btn btn-danger';
        alert(this.clase);
        break;
    }
  }

  cambia() {
    this.showDetail = !this.showDetail;
    this.showValue.emit({ pedido: this.pedido });
  }

  ngOnInit() {
    this.TraerDireccion(this.pedido);
    this.TraerExpreso(this.pedido);
    this.claseButton(this.pedido.estado);
  }
}
