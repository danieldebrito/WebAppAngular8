import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// class
import { Cliente } from 'src/app/class/cliente';

// servicios
import { PedidoItemsService } from 'src/app/services/pedidos/pedido-items.service';
import { AuthService } from 'src/app/services/clientes/auth.service';

@Component({
  selector: 'app-boton-comprar',
  templateUrl: './boton-comprar.component.html',
  styleUrls: ['./boton-comprar.component.css']
})
export class BotonComprarComponent implements OnInit {
  public identity: Cliente;
  @Input() id_articulo: string;
  public cantidad: number;

  constructor(
    private pedidoItemServ: PedidoItemsService,
    private authService: AuthService,
    private toastr: ToastrService) {
    this.cantidad = 1;
  }

  public cargaItem() {
    this.pedidoItemServ.Alta(-1, this.identity.idCliente, this.id_articulo, this.cantidad).then(
      response => {
        this.toastr.success('Cargado a Carrito', 'juntas MEYRO');
        return response;
      }
    ).catch(
      error => {
        console.error('ERROR DEL SERVIDOR, boton-comprar.ts', error);
      }
    );
  }

  ngOnInit() {
    this.identity = this.authService.getIdentityLocalStorage();
  }

  DoCheck() {
    // this.identity = this.authService.getIdentityLocalStorage();
  }
}
