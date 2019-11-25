import { Component, OnInit, DoCheck, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() allItems: ArtMarModMot[];
  @Output() showValue = new EventEmitter();

  public item: ArtMarModMot;
  public articulo: Articulo;
  public identity: Cliente;

  constructor(
    public modalService: NgbModal,
    public artService: ArticulosService,
    private authService: AuthService,
    private pedidosService: PedidosService,
    private router: Router
  ) { }

  public cambiarVista(art: Articulo) {
    this.artService.artDetalle = art;
    this.artService.show = false;
    this.showValue.emit({ show: this.artService.show });  // true, muestra grilla, false, muestra detalle de art
    this.router.navigate(['especificacion']);
  }

  public nuevoPedido(
    id_sucursal: number,
    id_expreso: number,
    observaciones: string
  ) {
    this.pedidosService.Alta(
      id_sucursal,
      id_expreso,
      'en_curso',
      this.pedidosService.getfecha(),
      observaciones
    ).then(
        response => {
          const id_pedido = response;
          this.updateItems(id_pedido);
        }
      )
      .catch(
        error => {
          console.error('ERROR DEL SERVIDOR', error);
        }
      );
  }

  public updateItems(id_pedido: object) {
    return id_pedido;
  }

  /* trae el art por cada item y retorna el precio para usar en el html */
  public traerArt(item: ArtMarModMot) {
    this.articulo = this.artService.traerArtLocalStorage(item.id_articulo);
    return this.articulo.precio_lista;
  }

  public traeUrlImgArt(id: string) {
    return this.artService.traerImgArt(id);
  }

  open() {
    const modalRef = this.modalService.open(CarouselDetailComponent);
    modalRef.componentInstance.name = 'World';
  }

  ngOnInit() {
    this.identity = this.authService.getIdentityLocalStorage();
  }

  ngDoCheck() {
    this.identity = this.authService.getIdentityLocalStorage();
  }
}
