import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-prod-version',
  templateUrl: './tabla-prod-version.component.html',
  styleUrls: ['./tabla-prod-version.component.css']
})
export class TablaProdVersionComponent implements OnInit {

  @Input() allItems: Articulo;
  @Output() showValue = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  cambia() {
    this.showValue.emit();
  }

}
