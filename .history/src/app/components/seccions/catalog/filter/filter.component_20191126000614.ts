import { Component, OnInit } from '@angular/core';
// class
import { ArtMarModMot } from 'src/app/class/ArtMarModMot';
// services
import { AmmmService } from 'src/app/services/catalogo/ammm.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  // los datos filtrados
  public filtroItems;

  // para colapsar menues de filtros.
  public isCollapsed = false;
  public isCollapsed2 = true;
  public isCollapsed3 = true;
  // anternar entre grilla y detalle, true muestra grilla.
  public show: boolean;

  // valores de los selects.
  public linea: string;
  public marca: string;
  public combustible: string;
  public motor: string;
  public modelo: string;
  public cilindrada: string;
  public competicion: string;
  public producto: string;
  public aplicacion: string;

  // columnas sin repeticion.
  public columnaLinea: string[];
  public columnaMarca: string[];
  public columnaComb: string[];
  public columnaMotor: string[];
  public columnaModelo: string[];
  public columnaCilind: string[];
  public columnaStd: string[];
  public columnaProd: string[];
  public columnaApp: string[];

  constructor(private ammmService: AmmmService) {
    this.show = true;
  }

  colapsar1() {
    this.isCollapsed = false;
    this.isCollapsed2 = true;
    this.isCollapsed3 = true;
  }

  colapsar2() {
    this.isCollapsed = true;
    this.isCollapsed2 = false;
    this.isCollapsed3 = true;
  }

  colapsar3() {
    this.isCollapsed = true;
    this.isCollapsed2 = true;
    this.isCollapsed3 = false;
  }

  public Colunmas(items: ArtMarModMot[]) {
    let arrayAuxLinea: string[] = [];
    let arrayAuxMarca: string[] = [];
    let arrayAuxComb: string[] = [];
    let arrayAuxMotor: string[] = [];
    let arrayAuxModelo: string[] = [];
    let arrayAuxCilind: string[] = [];
    let arrayAuxStd: string[] = [];
    let arrayAuxProd: string[] = [];
    let arrayAuxApp: string[] = [];

    const arrayRetLinea: string[] = [];
    const arrayRetMarca: string[] = [];
    const arrayRetComb: string[] = [];
    const arrayRetMotor: string[] = [];
    const arrayRetModelo: string[] = [];
    const arrayRetCilind: string[] = [];
    const arrayRetStd: string[] = [];
    const arrayRetProd: string[] = [];
    const arrayRetApp: string[] = [];

    if (items) {
      const tam = items.length;

      for (let i = 0; i < tam; i++) {
        arrayAuxLinea.push(items[i].id_linea);
        arrayAuxMarca.push(items[i].id_marca);
        arrayAuxComb.push(items[i].id_combustible);
        arrayAuxMotor.push(items[i].motor);
        arrayAuxModelo.push(items[i].modelo);
        arrayAuxCilind.push(items[i].cilindrada);
        arrayAuxStd.push(items[i].id_combustible);
        arrayAuxProd.push(items[i].id_producto);
        arrayAuxApp.push(items[i].id_aplicacion);
      }

      arrayAuxLinea = arrayAuxLinea.sort();
      arrayAuxMarca = arrayAuxMarca.sort();
      arrayAuxComb = arrayAuxComb.sort();
      arrayAuxMotor = arrayAuxMotor.sort();
      arrayAuxModelo = arrayAuxModelo.sort();
      arrayAuxCilind = arrayAuxCilind.sort();
      arrayAuxStd = arrayAuxStd.sort();
      arrayAuxProd = arrayAuxProd.sort();
      arrayAuxApp = arrayAuxApp.sort();

      for (let i = 0; i < tam; i++) {

        if (arrayAuxLinea[i] === arrayAuxLinea[i] && arrayAuxLinea[i] !== arrayAuxLinea[i - 1]) {
          arrayRetLinea.push(arrayAuxLinea[i]);
        }

        if (arrayAuxMarca[i] === arrayAuxMarca[i] && arrayAuxMarca[i] !== arrayAuxMarca[i - 1]) {
          arrayRetMarca.push(arrayAuxMarca[i]);
        }

        if (arrayAuxComb[i] === arrayAuxComb[i] && arrayAuxComb[i] !== arrayAuxComb[i - 1]) {
          arrayRetComb.push(arrayAuxComb[i]);
        }

        if (arrayAuxMotor[i] === arrayAuxMotor[i] && arrayAuxMotor[i] !== arrayAuxMotor[i - 1]) {
          arrayRetMotor.push(arrayAuxMotor[i]);
        }

        if (arrayAuxModelo[i] === arrayAuxModelo[i] && arrayAuxModelo[i] !== arrayAuxModelo[i - 1]) {
          arrayRetModelo.push(arrayAuxModelo[i]);
        }

        if (arrayAuxCilind[i] === arrayAuxCilind[i] && arrayAuxCilind[i] !== arrayAuxCilind[i - 1]) {
          arrayRetCilind.push(arrayAuxCilind[i]);
        }

        if (arrayAuxStd[i] === arrayAuxStd[i] && arrayAuxStd[i] !== arrayAuxStd[i - 1]) {
          arrayRetStd.push(arrayAuxStd[i]);
        }

        if (arrayAuxProd[i] === arrayAuxProd[i] && arrayAuxProd[i] !== arrayAuxProd[i - 1]) {
          arrayRetProd.push(arrayAuxProd[i]);
        }

        if (arrayAuxApp[i] === arrayAuxApp[i] && arrayAuxApp[i] !== arrayAuxApp[i - 1]) {
          arrayRetApp.push(arrayAuxApp[i]);
        }
      }

      this.columnaLinea = arrayRetLinea;
      this.columnaMarca = arrayRetMarca;
      this.columnaComb = arrayRetComb;
      this.columnaMotor = arrayRetMotor;
      this.columnaModelo = arrayRetModelo;
      this.columnaCilind = arrayRetCilind;
      this.columnaStd = arrayRetStd;
      this.columnaProd = arrayRetProd;
      this.columnaApp = arrayRetApp;
    }
  }


  public LimpiaColumnas() {
    this.columnaLinea = [];
    this.columnaMarca = [];
    this.columnaComb = [];
    this.columnaMotor = [];
    this.columnaModelo = [];
    this.columnaCilind = [];
    this.columnaStd = [];
    this.columnaProd = [];
    this.columnaApp = [];

    this.Colunmas(this.filtroItems);
  }


  ngOnInit() {
  }

}
