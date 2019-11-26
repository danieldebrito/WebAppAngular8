import { Injectable } from '@angular/core';
import { Login } from 'src/app/class/login';
import { BaseService } from 'src/app/services/base.service';
import { Cliente } from 'src/app/class/cliente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // link para redireccionar de acuerdo al resultado del login
  redirectUrl: string;

  public identity: Cliente;

  constructor(public miHttp: BaseService) { }

  Loguear(dataLogin: Login) {
    const request: JSON = JSON.parse(JSON.stringify(dataLogin));

    return this.miHttp.httpPostP('/clientes/login', request);
  }

  public getIdentityLocalStorage() {
    const identityLS = JSON.parse(localStorage.getItem('identity'));
    if (identityLS !== 'undefined') {
      this.identity = identityLS;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  public logout() {
    localStorage.clear();
  }

}
