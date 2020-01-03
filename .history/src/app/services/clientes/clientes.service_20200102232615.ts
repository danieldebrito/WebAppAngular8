import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Cliente } from 'src/app/class/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(public miHttp: BaseService) { }
  /*
  	public $idCliente;
	public $cuit;
	public $razonSocial;
	public $condFiscal; // enum
	public $retIIBBcoef;
	public $idDescuento;
	public $userNombre;
	public $email;
	public $clave;
	public $estado;
  */

  public altaCliente(
    idCliente: string,
    cuit: string,
    razonSocial: string,
    condFiscal: string,
    retIIBBcoef: string,
    idDescuento: string,
    userNombre: string,
    email: string,
    clave: string,
    estado: string
  ): Promise<object> {

      const request: object = {
        idCliente,
        cuit,
        razonSocial,
        condFiscal,
        retIIBBcoef,
        idDescuento,
        userNombre,
        email,
        clave,
        estado
    };
      return this.miHttp.httpPostP('/clientes/', request);
  }

  public traerUno(id: string): Observable<Cliente> {
    return this.miHttp.httpGetO<Cliente>('/clientes/' + '"' + id + '"');
  }
}

