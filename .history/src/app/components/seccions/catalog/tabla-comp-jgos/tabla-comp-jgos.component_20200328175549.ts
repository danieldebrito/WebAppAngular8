import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Articulo } from 'src/app/class/articulo';

@Component({
  selector: 'app-tabla-comp-jgos',
  templateUrl: './tabla-comp-jgos.component.html',
  styleUrls: ['./tabla-comp-jgos.component.css']
})
export class TablaCompJgosComponent {

  @Input() allItems: Articulo[];
  @Output() showValue = new EventEmitter();

  cambia() {
    this.showValue.emit();
  }
}
