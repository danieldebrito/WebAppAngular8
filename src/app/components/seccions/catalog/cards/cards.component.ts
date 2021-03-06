import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Cards } from 'src/app/class/cards';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/class/articulo';
import { ArticulosService } from 'src/app/services/catalogo/articulos.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() Items: Cards[] = [];
  @Output() showValue = new EventEmitter();

  public p: number;  // paginacion primer page
  public art: Articulo;

  constructor(
    private router: Router,
    private artService: ArticulosService
  ) { this.p = 1; }

  public cambiarVista(art: Articulo) {
    this.artService.artDetalle = art;
    this.artService.show = false;
    this.showValue.emit({ show: this.artService.show });  // true, muestra grilla, false, muestra detalle de art
    this.router.navigate(['especificacion']);
  }


  // traer uno por id
  public traerArtID(id) {
    this.artService.TraerUno(id).subscribe(response => {
      this.art = response;
      return this.art.img_peq_url;
    },
      error => {
        console.error(error);
      });
  }

  public scrollTop() {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.scrollTop();
  }
}
