import { Component, OnInit, Input } from '@angular/core';
import { ArtMarModMot } from 'src/app/class/ArtMarModMot';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() Items: ArtMarModMot[];
  public p: number;  // paginacion primer page

  constructor() {
    this.p = 1;
  }

  ngOnInit() { }
}
