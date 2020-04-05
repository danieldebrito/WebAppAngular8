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

  public cuentaItemsCarrito() {
    if (this.identity == null) {
      this.cantItemsCarrito = 0;
    } else {
        this.carritoItemsService.getCarritoItems().subscribe(carritoItems => {
          this.cantItemsCarrito = carritoItems.length;
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
    // this.cuentaItemsCarrito();
  }
}
