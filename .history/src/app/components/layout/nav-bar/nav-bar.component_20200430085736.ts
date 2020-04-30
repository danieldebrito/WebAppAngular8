import { Component, OnInit, DoCheck } from '@angular/core';
import { Cliente } from 'src/app/class/cliente';
import { AuthService } from 'src/app/services/clientes/auth.service';
import { CarritoItemsService } from 'src/app/services/firebase/carrito-items.service';

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
    public carritoItemsService: CarritoItemsService
    ) { }

  public async cuentaItemsCarrito() {
    if (this.identity == null) {
      this.cantItemsCarrito = 0;
    } else {
        (await this.carritoItemsService.getCarritoItems()).subscribe(elements => {
          this.cantItemsCarrito = elements.filter(item => item.idCliente === this.identity.idCliente && item.idPedido === -1).length;
        });
    }}

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.identity = this.authService.getIdentityLocalStorage();
    this.cuentaItemsCarrito();
  }


  ngDoCheck() {
    this.identity = this.authService.getIdentityLocalStorage();
  }
}
