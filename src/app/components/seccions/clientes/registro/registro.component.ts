import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/class/cliente';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public cliente: Cliente;
  public mensaje;

  public clienteService: ClientesService;

  constructor(servicio: ClientesService, private router: Router) {
    this.clienteService = servicio;
    this.cliente = new Cliente ('', '', '', '', '', '', '');
  }

  public altaCliente() {
    this.clienteService.altaCliente(
      this.cliente.id,
      this.cliente.cuit,
      this.cliente.razonSocial,
      this.cliente.comprador,
      this.cliente.email,
      this.cliente.clave
        ).then(
            response => {
                this.mensaje = response;  //  agregar, no hay nada en el response
                this.router.navigate(['home']);  //  redirecciona a HOME
            }
        )
        .catch(
            error => {
                console.error('ERROR DEL SERVIDOR', error);
            }
        );
}

  onSubmit() {
    this.altaCliente();
}

  ngOnInit() {
  }

}
