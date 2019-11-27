import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/class/login';
import { AuthService } from 'src/app/services/clientes/auth.service';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/class/cliente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public login: Login;
  public id: string;
  public clave: string;
  public message: string;   // para mostrar en consola
  public error: boolean;    // para alternar vista en caso de error
  public identity: Cliente; // cliente logueado

  constructor(
    private authService: AuthService,
    private consultaClientesService: ClientesService,
    private router: Router
  ) {
    this.login = new Login('', '');
  }

  public cargaLocalStorage(id: string) {
    this.consultaClientesService.traerUno(id).subscribe(response => {

      this.identity = response;
      localStorage.setItem('identity', JSON.stringify(this.identity));
    },
      error => {
        console.error(error);
      });
  }

  public onSubmit(): void {
    this.message = '';
    this.error = false;

    this.authService.Loguear(this.login)
      .then(
        response => {

          if (response['Estado'] === 'OK') {
            if (!this.authService.redirectUrl) {
              this.authService.redirectUrl = '/catalog';
              this.message = response['Mensaje'];
            }

            this.cargaLocalStorage(this.login.id);                 // carga el usuario logueado
            this.error = false;                                    // alterna la vista
            this.router.navigate([this.authService.redirectUrl]);  // redirige a catalo en caso de logueo exitoso
          } else {
            this.error = true;
            this.message = response['Mensaje'];
          }
        }
      )
      .catch(
        response => {
          console.log('response error => ', response);
          this.error = true;
          this.message = response['Mensaje'];
        }
      );

    console.log(this.message);
  }

  cambiaVista() {
    this.error = !this.error;
  }

  ngOnInit() {
  }
}
