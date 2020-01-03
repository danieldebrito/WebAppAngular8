import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteSucursal } from 'src/app/class/clienteSucursal';
import { Cliente } from 'src/app/class/cliente';
import { SucursalesService } from 'src/app/services/clientes/sucursales.service';
import { AuthService } from 'src/app/services/clientes/auth.service';

@Component({
  selector: 'app-sucursales-nueva',
  templateUrl: './sucursales-nueva.component.html',
  styleUrls: ['./sucursales-nueva.component.css']
})
export class SucursalesNuevaComponent implements OnInit {

  public identity: Cliente;
  public sucursal: ClienteSucursal;
  public id_sucursal_alta;
  public redirectURL: string;

  constructor(
    private sucursalesService: SucursalesService,
    private authService: AuthService,
    private router: Router
  ) {
    this.identity = this.authService.getIdentityLocalStorage();
    this.sucursal = new ClienteSucursal('', '', 0, '', '', 0, '', '', '');
  }

  public alta() {
    this.sucursalesService.Alta(
      this.identity.idCliente,
      this.sucursal.idClienteExpreso,
      this.sucursal.nombreSucursal,
      this.sucursal.calle,
      this.sucursal.numero,
      this.sucursal.cp,
      this.sucursal.localidad,
      this.sucursal.provincia
    ).then(
        response => {
          this.id_sucursal_alta = response;
          this.redirectURL = '/misDatos';
          this.router.navigate([this.redirectURL]);
          this.limpiarForm ();
        }
      )
      .catch(
        error => {
          console.error('ERROR DEL SERVIDOR', error);
        }
      );
  }

  public limpiarForm() {
    this.sucursal = new ClienteSucursal('', '', 0, '', '', 0, '', '', '');
  }

  ngOnInit() { this.identity = this.authService.getIdentityLocalStorage(); }

}
