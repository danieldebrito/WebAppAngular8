import { Component, OnInit, DoCheck } from '@angular/core';
import { Cliente } from 'src/app/class/cliente';
import { AuthService } from 'src/app/services/clientes/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, DoCheck {

  public identity: Cliente;

  isNavbarCollapsed = true;

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.identity = this.authService.getIdentityLocalStorage();
  }


  ngDoCheck() {
    this.identity = this.authService.getIdentityLocalStorage();
  }

}
