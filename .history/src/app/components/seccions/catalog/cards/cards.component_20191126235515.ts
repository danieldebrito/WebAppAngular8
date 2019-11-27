import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArtMarModMot } from 'src/app/class/ArtMarModMot';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/class/articulo';
import { ArticulosService } from 'src/app/services/catalogo/articulos.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() Items: ArtMarModMot[];
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
    },
      error => {
        console.error(error);
      });
  }


  ngOnInit() { }
}
