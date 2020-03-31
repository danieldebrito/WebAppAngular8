import { Component, OnInit, DoCheck } from '@angular/core';
import { Cliente } from 'src/app/class/cliente';
import { AuthService } from 'src/app/services/clientes/auth.service';
import { PedidoItemsService } from 'src/app/services/pedidos/pedido-items.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, DoCheck {

  public identity: Cliente;
  public cantItemsCarrito: number;

  isNavbarCollapsed = true;

  constructor(
    private authService: AuthService,
    private pedidoItemServ: PedidoItemsService
  ) { }

  public cuentaItemsCarrito() {

    if (this.identity == null) {
      this.cantItemsCarrito = 0;
    } else {
    this.pedidoItemServ.traerItemsClienteAbierto(this.identity.idCliente).subscribe(response => {
      this.cantItemsCarrito = response.length;
      // localStorage.setItem('pedidoItemsLS', JSON.stringify(response));

    },
      error => {
        console.error(error);
      });
    }
    }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.identity = this.authService.getIdentityLocalStorage();
    this.cuentaItemsCarrito();
  }


  ngDoCheck() {
    this.identity = this.authService.getIdentityLocalStorage();
    this.cuentaItemsCarrito();
  }
}
