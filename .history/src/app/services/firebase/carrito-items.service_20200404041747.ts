import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CarritoItem } from 'src/app/class/carritoItem';

@Injectable({
  providedIn: 'root'
})
export class CarritoItemsService {

  carritoItemsCollection;
  carritoItemDoc;
  carritoItems: Observable<CarritoItem[]>;

  constructor(public db: AngularFirestore) {
    this.carritoItems = this.db.collection('carritoItems').valueChanges();
  }

  public getCarritoItems() {
    return this.carritoItems;
  }


}
