import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// class
import { Cliente } from 'src/app/class/cliente';
// import { PedidoItem } from 'src/app/class/pedidoItem';
import { Articulo } from 'src/app/class/articulo';
import { CarritoItem } from 'src/app/class/carritoItem';

// servicios
// import { PedidoItemsService } from 'src/app/services/pedidos/pedido-items.service';
import { AuthService } from 'src/app/services/clientes/auth.service';
import { ArticulosService } from 'src/app/services/catalogo/articulos.service';

// firebase
import { CarritoItemsService } from 'src/app/services/firebase/carrito-items.service';

@Component({
  selector: 'app-boton-comprar',
  templateUrl: './boton-comprar.component.html',
  styleUrls: ['./boton-comprar.component.css']
})
export class BotonComprarComponent implements OnInit {

  public identity: Cliente;  //  cliente logueado

  @Input() id_articulo: string;  // id articulo clickeado para comprar
  public articulo: Articulo;    //  articulo clickeado para comprar
  public cantidad: number; // cantidad clickeada para comprar

  public carritoItems: CarritoItem[];  // listado de items del carrito
  public carritoItem = {} as CarritoItem; // item a dar de alta

  constructor(
    // private pedidoItemServ: PedidoItemsService,
    private authService: AuthService,
    private artService: ArticulosService,
    private toastr: ToastrService,
    public carritoItemsService: CarritoItemsService
  ) {
    this.cantidad = 1;
  }

  public traerArticulo(id) {
    this.artService.TraerUno(id).subscribe(response => {
      this.articulo = response;
    },
      error => {
        console.error(error);
      });
  }

  public getCarritoItems() {
    this.carritoItemsService.getCarritoItems().subscribe(carritoItems => {
      this.carritoItems = carritoItems;
    }
    );
  }

  public addCarritoItem() {
    this.carritoItem.idPedido = -1;
    this.carritoItem.idCliente = this.identity.idCliente;
    this.carritoItem.idArticulo = this.id_articulo;
    this.carritoItem.cantidad = this.cantidad;
    this.carritoItem.precioLista = this.articulo.precio_lista;

    this.carritoItemsService.addCarritoItem(this.carritoItem);
  }

  /**
   * 
   * @param carritoItemUpdate le paso un elemento de ahi saca el id y los datos actualizados
   */
  updateCarritoItem(carritoItemUpdate: CarritoItem) {
    this.carritoItemsService.updateCarritoItem(carritoItemUpdate);
  }

  public cargarCarrritoItem() {

    let flag = true;
    this.getCarritoItems();
    let carritoItemAux: CarritoItem;

    console.log(this.carritoItems);
/*
    for (let i; i < this.carritoItems.length; i++) {
      if (this.carritoItems[i].idArticulo === this.id_articulo) {
        carritoItemAux = this.carritoItems[i]; // copio todo inclusive el id de ahi lo saca, y actualizo el campo que quiero
        carritoItemAux.cantidad += this.carritoItem.cantidad;
        this.updateCarritoItem(carritoItemAux);
        flag = false;
      }/*

      /*
          this.carritoItems.forEach(element => {
            if ( element.idArticulo === this.id_articulo ) {
              carritoItemAux = element; // copio todo inclusive el id de ahi lo saca, y actualizo el campo que quiero
              carritoItemAux.cantidad += this.carritoItem.cantidad;
              this.updateCarritoItem(carritoItemAux);
              flag = false;
            }
          });*/
          /*
      if (flag) {
        this.addCarritoItem();
      }*/

      this.toastr.success('Cargado a Carrito', 'juntas MEYRO');
    }
  }

  ngOnInit() {
    this.getCarritoItems();
    this.identity = this.authService.getIdentityLocalStorage();
    this.traerArticulo(this.id_articulo);
    // this.getCarritoItems();
  }
}

/* ================================================================================================= */

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




/*
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
          this.pedidoItems[i].cantidad += this.cantidad,
          this.pedidoItems[i].precio_lista);
        flag = false;
        break;
      }
    }
    if (flag) {

      alert(this.articulo.descripcion_corta  );

      this.traerArticulo(this.id_articulo);

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




  public ListarItemsAbiertos() {
    this.pedidoItemServ.traerItemsClienteAbierto(this.identity.idCliente).subscribe(response => {
      this.pedidoItems = response;
    },
      error => {
        console.error(error);
      });
  }


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
*/