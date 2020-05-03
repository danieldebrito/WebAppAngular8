import { Component, OnInit } from '@angular/core';
// class
import { Cards } from 'src/app/class/cards';
// services
import { CardsService } from 'src/app/services/catalogo/cards.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  // idArticulo a buscar menu de buscar por codigo de busqueda
  public idArticulo;
  // frase de busqueda libre
  public fraseBusqueda;

  // los datos filtrados
  public dataFiltrada;

  // para colapsar menues de filtros.
  public isCollapsed = false;
  public isCollapsed2 = true;
  public isCollapsed3 = true;

  // alternar entre grilla y detalle, true muestra grilla.
  public show: boolean;

  // valores seleccionados en los selects.
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

  constructor(
    private cardsService: CardsService
  ) {
    this.show = true;
  }

  colapsar1() {
    this.isCollapsed = false;
    this.isCollapsed2 = true;
    this.isCollapsed3 = true;
    this.buscarPorFraseLimpiar();
  }

  colapsar2() {
    this.isCollapsed = true;
    this.isCollapsed2 = false;
    this.isCollapsed3 = true;
    this.buscarPorFraseLimpiar();
  }

  colapsar3() {
    this.isCollapsed = true;
    this.isCollapsed2 = true;
    this.isCollapsed3 = false;
    this.buscarPorFraseLimpiar();
  }

  public cambiaVista() {
  }

  public Colunmas(items: Cards[]) {
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
        arrayAuxLinea.push(items[i].linea);
        arrayAuxMarca.push(items[i].marca);
        arrayAuxComb.push(items[i].combustible);
        arrayAuxMotor.push(items[i].motor);
        arrayAuxModelo.push(items[i].modelo);
        arrayAuxCilind.push(items[i].cilindrada);
        arrayAuxStd.push(items[i].competicion);
        arrayAuxProd.push(items[i].producto);
        arrayAuxApp.push(items[i].aplicacion);
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

    this.Colunmas(this.dataFiltrada);
  }

  public Filtrar() {
    this.cardsService.FiltrarP(
      this.linea,
      this.marca,
      this.combustible,
      this.motor,
      this.modelo,
      this.cilindrada,
      this.competicion,
      this.producto,
      this.aplicacion).then(
        response => {
          this.dataFiltrada = response;
          this.Colunmas(this.dataFiltrada);
        }
      )
      .catch(
        error => {
          console.error('ERROR DEL SERVIDOR, FILTRO COMPONENT.TS => ', error);
        }
      );
  }

  public Limpiar() {
    this.cardsService.ListarO().subscribe(response => {
      this.concatenarModelos(response);
      // this.dataFiltrada = response;

      this.linea = '';
      this.marca = '';
      this.combustible = '';
      this.motor = '';
      this.modelo = '';
      this.cilindrada = '';
      this.competicion = '';
      this.producto = '';
      this.aplicacion = '';

      this.LimpiaColumnas();
    },
      error => {
        console.error(error);
      });
  }

  public concatenarModelos(response) {
    const tam = response.length;
    const cardAux: Cards = {};
    const arrayAux = response;
    arrayAux.unshift(cardAux);
    const dataFiltradaRet = [];

    alert(response.length + '' + arrayAux.length );

    for (let i = 0; i < tam; i++) {
      if (response[i].id_articulo === cardAux[i].id_articulo
        && response[i].motor === cardAux[i].motor) {


      } else {
      }
      this.dataFiltrada = dataFiltradaRet;
    }
  }

  public getByID() {
    this.cardsService.getById(this.idArticulo).subscribe(response => {
      this.dataFiltrada = response;
    });
  }

  public buscarPorFrase() {
    this.cardsService.buscarPorFrase(this.fraseBusqueda).subscribe(response => {
      this.dataFiltrada = response;
    });
  }

  public buscarPorFraseLimpiar() {
    this.cardsService.ListarO().subscribe(response => {
      this.dataFiltrada = response;
    });
  }



  ngOnInit() {
    this.Limpiar();
  }

}
