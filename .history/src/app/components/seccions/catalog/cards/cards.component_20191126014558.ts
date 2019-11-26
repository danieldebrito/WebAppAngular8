import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArtMarModMot } from 'src/app/class/ArtMarModMot';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() Items: ArtMarModMot[];
  @Output() showValue = new EventEmitter();


  public p: number;  // paginacion primer page

  constructor() {
    this.p = 1;
  }

  ngOnInit() { }
}
