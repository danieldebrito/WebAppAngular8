import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ArticulosService } from 'src/app/services/catalogo/articulos.service';
import { Articulo } from 'src/app/class/articulo';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Output() showValue = new EventEmitter();

  public showDetail: boolean;
  public art: Articulo;

  // img carousel

  images = ['/assets/images/juntas/tc-01.jpg',
    '/assets/images/juntas/tc-02.jpg',
    '/assets/images/juntas/tc-03.jpg'];

  constructor(private artService: ArticulosService) {
    this.showDetail = false;
    this.art = new Articulo('', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '');
  }

  cambiaVista() {
    this.showDetail = !this.showDetail;
  }

  /* public traerUno() {
     this.artService.traerUno().subscribe(response => {
         this.art = response;
     },
         error => {
             console.error(error);
         });
 }*/
 public scrollTop() {
  window.scroll(0, 0);
}


  ngOnInit() {
    //  this.traerUno();
    this.scrollTop();
  }
}
