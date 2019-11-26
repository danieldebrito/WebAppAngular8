import { Component, OnInit } from '@angular/core';
import { ArtMarModMot } from 'src/app/class/ArtMarModMot';
import { AmmmService } from 'src/app/services/catalogo/ammm.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  public ammm: ArtMarModMot[];
  public p: number;  // paginacion primer page

  constructor(private ammmService: AmmmService) {
    this.p = 1;
  }


  public listar() {
    this.ammmService.ListarO().subscribe(response => {
      this.ammm = response;
    },
      error => {
        console.error(error);
      });
  }

  ngOnInit() {
    this.listar();
  }

}
