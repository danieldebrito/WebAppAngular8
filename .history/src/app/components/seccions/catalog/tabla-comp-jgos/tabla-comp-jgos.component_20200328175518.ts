import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ArticulosService } from 'src/app/services/catalogo/articulos.service';
import { Articulo } from 'src/app/class/articulo';

@Component({
  selector: 'app-tabla-comp-jgos',
  templateUrl: './tabla-comp-jgos.component.html',
  styleUrls: ['./tabla-comp-jgos.component.css']
})
export class TablaCompJgosComponent {

  @Input() allItems: Articulo[];
  @Output() showValue = new EventEmitter();

  constructor( private articulosService: ArticulosService ) {

  }

  cambia() {
    this.showValue.emit();
  }
}
