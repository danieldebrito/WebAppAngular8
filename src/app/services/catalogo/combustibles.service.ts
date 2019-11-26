import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Combustible } from 'src/app/class/combustible';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CombustiblesService {

  public allCombustibles: Combustible[] = [];


  constructor(public miHttp: BaseService) { }

  public Listar(): Observable<Combustible[]> {
    return this.miHttp.httpGetO<Combustible[]>('/combustibles/');
  }

  public Baja(id: string): Promise<object> {
    return this.miHttp.httpDeleteP('/combustibles/' + id );
  }

  public TraerUno(id: string): Observable<Combustible> {
    return this.miHttp.httpGetO<Combustible>('/combustibles/' +  id );
  }

  public Alta(
    id_combustible: string,
    combustible: string
  ): Promise<object> {
    const request: object = {
      id_combustible,
      combustible
    };
    return this.miHttp.httpPostP('/combustibles/', request);
  }

  public Update(
    id_combustible: string,
    combustible: string
  ): Promise<object> {
    const request: object = {
      id_combustible,
      combustible
    };
    return this.miHttp.httpPostP('/combustibles/update', request);
  }

  public GuardarArtLocalStorage() {
    this.Listar().subscribe(response => {
      this.allCombustibles = response;
      localStorage.setItem('allCombustibles', JSON.stringify(this.allCombustibles));

      return this.allCombustibles;
    },
      error => {
        console.error(error);
      });
  }

  public LeerArtLocalStorage() {
    this.allCombustibles = JSON.parse(localStorage.getItem('allCombustibles'));
    return this.allCombustibles;
  }

  public traerComb ( id: string ) {
    const tam = this.allCombustibles.length;

    for ( let i = 0 ; i < tam ; i++) {
      if (this.allCombustibles[i].id_combustible === id) {
        return this.allCombustibles[i].combustible;
      }
    }
  }

  public traerId ( combustible: string ) {
    const tam = this.allCombustibles.length;

    for ( let i = 0 ; i < tam ; i++) {
      if (this.allCombustibles[i].combustible === combustible) {
        return this.allCombustibles[i].id_combustible;
      }
    }
  }

}
