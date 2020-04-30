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
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

// firebase
import { CarritoItemsService } from 'src/app/services/firebase/carrito-items.service';
import { isUndefined } from 'util';

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
    private pedidosService: PedidosService,
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

  public async getCarritoItems() {
    (await this.carritoItemsService.getCarritoItems()).subscribe(elements => {
      this.carritoItems = elements.filter(item => item.idCliente === this.identity.idCliente && item.idPedido === -1);
    });
  }

  public addCarritoItem() {
    this.carritoItem.idPedido = -1;
    this.carritoItem.idCliente = this.identity.idCliente;
    this.carritoItem.idArticulo = this.id_articulo;
    this.carritoItem.cantidad = this.cantidad;
    this.carritoItem.descripcionCorta = this.articulo.descripcion_corta;
    this.carritoItem.precioLista = this.articulo.precio_lista;

    this.carritoItemsService.addCarritoItem(this.carritoItem);
  }

  updateCarritoItem(carritoItemUpdate: CarritoItem) {
    this.carritoItemsService.updateCarritoItem(carritoItemUpdate);
  }

  public cargarCarrritoItem() {
    let flag = true;
    this.getCarritoItems();
    let carritoItemAux: CarritoItem;

    if ( isUndefined(this.pedidosService.idPedido) ) {
      this.addPedido();
    }

    this.carritoItems.forEach(element => {
      if (element.idArticulo === this.id_articulo) {
        carritoItemAux = element; // copio todo inclusive el id de ahi lo saca, y actualizo el campo que quiero
        carritoItemAux.cantidad += this.cantidad;
        this.updateCarritoItem(carritoItemAux);
        flag = false;
      }
    });

    if (flag) {
      this.addCarritoItem();
    }
    this.toastr.success('Cargado a Carrito', 'juntas MEYRO');
  }

  public async getPedidoClienteAbierto() {
    this.pedidosService.traerpedidoAbierto(this.identity.idCliente).subscribe(async response => {
      this.pedidosService.idPedido = response.idPedido;
    },
      error => {
        console.error(error);
      });
  }

  /*
        public idPedido?: number,
        public idClienteSucursal?: number,
        public idCliente?: string,
        public idExpreso?: number,
        public estado?: string,
        public fecha?: number,
        public idDescuento?: string,
        public subtotalNeto?: number,
        public observaciones?: string
  */

  public async addPedido() {
    this.pedidosService.Alta(
      '',
      this.identity.idCliente,
      '',
      'abierto',
      '',
      '',
      0,
      ''
    ).then(
      response => {
        console.log('se genero el pedido nro => ' + response);  // tiro un mensajito
        this.pedidosService.idPedido = response;  // guardo en el servicio el id
      }
    ).catch(
      error => {
        console.error('ERROR DEL SERVIDOR', error);
      }
    );
  }

  ngOnInit() {
    this.getCarritoItems();
    this.identity = this.authService.getIdentityLocalStorage();
    this.traerArticulo(this.id_articulo);
    this.getPedidoClienteAbierto();
  }
}
