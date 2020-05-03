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

  @Input() Items: Cards[];
  @Output() showValue = new EventEmitter();

  public p: number;  // paginacion primer page
  public itemsCards: Cards[] = [];

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


  public concatenarModelos(items: Cards[]) {
      const tam = items.length;
      const itemsRet = items;

      for ( let i = 0 ; i < tam ; i++ ) {
        if ( items[i].id_articulo === items[i + 1].id_articulo
          && items[i].motor === items[i + 1].motor ) {
            itemsRet[i].modelo += itemsRet[i + 1].modelo;
            items.slice(1, (i + 1));
        }
      }
      this.itemsCards = itemsRet;
  }

  public scrollTop() {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.scrollTop();
  }
}
