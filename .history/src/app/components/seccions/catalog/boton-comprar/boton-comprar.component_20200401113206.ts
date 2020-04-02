import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// class
import { Cliente } from 'src/app/class/cliente';
import { PedidoItem } from 'src/app/class/pedidoItem';
import { Articulo } from 'src/app/class/articulo';

// servicios
import { PedidoItemsService } from 'src/app/services/pedidos/pedido-items.service';
import { AuthService } from 'src/app/services/clientes/auth.service';
import { ArticulosService } from 'src/app/services/catalogo/articulos.service';

@Component({
  selector: 'app-boton-comprar',
  templateUrl: './boton-comprar.component.html',
  styleUrls: ['./boton-comprar.component.css']
})
export class BotonComprarComponent implements OnInit {
  public identity: Cliente;
  @Input() id_articulo: string;
  public cantidad: number;
  public articulo: Articulo;

  public pedidoItems: PedidoItem[] = [];

  constructor(
    private pedidoItemServ: PedidoItemsService,
    private authService: AuthService,
    private artService: ArticulosService,
    private toastr: ToastrService) {
    this.cantidad = 1;
  }

  /**
   * carga iten a MySQL
   */
  public cargaItem() {
    this.ListarItemsAbiertos();
    const long = this.pedidoItems.length;
    let flag = true;
    for (let i = 0; i < long; i++) {
      if (this.pedidoItems[i].idArticulo === this.articulo.id_articulo) {
        this.updateItem(
          this.pedidoItems[i].idPedidoItem,
          this.pedidoItems[i].idPedido,
          this.identity.idCliente,
          this.pedidoItems[i].idArticulo,
          this.pedidoItems[i].cantidad += this.cantidad,
          this.pedidoItems[i].precio_lista);
        flag = false;
        break;
      }
    }
    if (flag) {

      alert(this.articulo.descripcion_corta  );

      const art = this.traerArticulo(this.articulo.id_articulo);

      this.pedidoItemServ.Alta(
        -1,
        this.identity.idCliente,
        this.articulo.id_articulo,
        this.cantidad,
        this.articulo.precio_lista ).then(
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
   * 
   * @param id 
   */
  public traerArticulo(id) {
    this.artService.TraerUno(id).subscribe(response => {
      this.articulo = response;
    },
      error => {
        console.error(error);
      });
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

  /**
   * 
   * @param idPedidoItem 
   * @param idPedido 
   * @param idCliente 
   * @param idArticulo 
   * @param cantidad 
   */
  public updateItem(idPedidoItem, idPedido, idCliente, idArticulo, cantidad, precio_lista) {
    this.pedidoItemServ.Update(idPedidoItem, idPedido, idCliente, idArticulo, cantidad, precio_lista).then(
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
    this.ListarItemsAbiertos();
    this.traerArticulo(this.id_articulo);
  }
}



  /**
   * carga item a Local Storage y MySQL
   */
  /*
  public cargaItemLS() {

    this.leerLS();

    const long = this.pedidoItemsLS.length;
    let flag = true;

    for (let i = 0; i < long; i++) {
      if (this.pedidoItemsLS[i].idArticulo === this.id_articulo) {
        this.pedidoItemsLS[i].cantidad += this.cantidad;
        flag = false;
        break;
      }
    }

    if (flag) {

      const item: any = {
        idPedidoItem: 0,
        idPedido: -1,
        idCliente: this.identity.idCliente,
        idArticulo: this.id_articulo,
        cantidad: this.cantidad
      };

      this.pedidoItemsLS.push(item);
      localStorage.setItem('pedidoItemsLS', JSON.stringify(this.pedidoItemsLS));

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
  }*/

    /*
 * trae los items que tengan el idPedido = -1 y sean del cliente en sesion, para carcar en el carrito
 * y los guarda en el local storage
 */
/*
  public cargarLS() {
    this.pedidoItemServ.traerItemsClienteAbierto(this.identity.idCliente).subscribe(response => {
      this.pedidoItems = response;
      localStorage.setItem('pedidoItemsLS', JSON.stringify(this.pedidoItemsLS));
    },
      error => {
        console.error(error);
      });
  }
  */

  /**
   * lee el local sttorage y lo carga a pedidoItemsLS
   */

   /*
  public leerLS() {
    this.pedidoItemsLS = JSON.parse(localStorage.getItem('pedidoItemsLS'));
  }*/

