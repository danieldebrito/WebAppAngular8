import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// class
import { Cliente } from 'src/app/class/cliente';
import { PedidoItem } from 'src/app/class/pedidoItem';

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

  public pedidoItems: PedidoItem[] = [];
  public pedidoItemsLS: PedidoItem[] = [];

  constructor(
    private pedidoItemServ: PedidoItemsService,
    private authService: AuthService,
    private toastr: ToastrService) {
    this.cantidad = 1;
  }

  /**
   * carga iten a Local Storage y MySQL
   */
  public cargaItemLS() {

    this.ListarItemsAbiertos();

    const long = this.pedidoItems.length;
    let flag = true;

    for (let i = 0; i < long; i++) {

      if (this.pedidoItems[i].idArticulo === this.id_articulo) {
        this.updateItem(
          this.pedidoItems[i].idPedidoItem,
          this.pedidoItems[i].idPedido,
          this.identity.idCliente,
          this.pedidoItems[i].idArticulo,
          this.pedidoItems[i].cantidad += this.cantidad);

        flag = false;
        break;
      }
    }

    if (flag) {
      this.pedidoItemServ.Alta(-1, this.identity.idCliente, this.id_articulo, this.cantidad).then(
        response => {
          return response;
        }
      ).catch(
        error => {
          console.error('ERROR DEL SERVIDOR, boton-comprar.ts', error);
        }
      );
    }

    this.toastr.success('Cargado a Carrito', 'juntas MEYRO');
  }


  /**
   * carga iten a MySQL
   */
  public cargaItem() {

    this.ListarItemsAbiertos();

    const long = this.pedidoItems.length;
    let flag = true;

    for (let i = 0; i < long; i++) {

      if (this.pedidoItems[i].idArticulo === this.id_articulo) {
        this.updateItem(
          this.pedidoItems[i].idPedidoItem,
          this.pedidoItems[i].idPedido,
          this.identity.idCliente,
          this.pedidoItems[i].idArticulo,
          this.pedidoItems[i].cantidad += this.cantidad);

        flag = false;
        break;
      }
    }

    if (flag) {
      this.pedidoItemServ.Alta(-1, this.identity.idCliente, this.id_articulo, this.cantidad).then(
        response => {
          return response;
        }
      ).catch(
        error => {
          console.error('ERROR DEL SERVIDOR, boton-comprar.ts', error);
        }
      );
    }

    this.toastr.success('Cargado a Carrito', 'juntas MEYRO');
  }

  /*
   * trae los items que tengan el idPedido = -1 y sean del cliente en sesion, para carcar en el carrito
   */
  public ListarItemsAbiertos() {
    this.pedidoItemServ.traerItemsClienteAbierto(this.identity.idCliente).subscribe(response => {
      this.pedidoItems = response;
    },
      error => {
        console.error(error);
      });
  }

  /*
 * trae los items que tengan el idPedido = -1 y sean del cliente en sesion, para carcar en el carrito
 * y los guarda en el local storage
 */
  public cargarLS() {
    this.pedidoItemServ.traerItemsClienteAbierto(this.identity.idCliente).subscribe(response => {
      this.pedidoItems = response;
      localStorage.setItem('pedidoItemsLS', JSON.stringify(this.pedidoItems));
    },
      error => {
        console.error(error);
      });
  }

  /**
   * lee el local sttorage y lo carga a pedidoItemsLS
   */

  public leerLS() {
    this.pedidoItemsLS = JSON.parse(localStorage.getItem('pedidoItemsLS'));
  }

  /**
   * 
   * @param idPedidoItem 
   * @param idPedido 
   * @param idCliente 
   * @param idArticulo 
   * @param cantidad 
   */

  public updateItem(idPedidoItem, idPedido, idCliente, idArticulo, cantidad) {
    this.pedidoItemServ.Update(idPedidoItem, idPedido, idCliente, idArticulo, cantidad).then(
      response => {
        return response;
      }
    ).catch(
      error => {
        console.error('ERROR DEL SERVIDOR, boton comprar component', error);
      }
    );
  }


  ngOnInit() {
    this.identity = this.authService.getIdentityLocalStorage();
    this.cargarLS();
  }
}
