import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarritoItem } from 'src/app/class/carritoItem';

@Injectable({
  providedIn: 'root'
})
export class CarritoItemsService {

  carritoItemsCollection: AngularFirestoreCollection<CarritoItem>;
  carritoItemDoc: AngularFirestoreDocument<CarritoItem>;
  carritoItems: Observable<CarritoItem[]>;

  public cantCarritoItems: number;
  public id;

  constructor(public db: AngularFirestore) {
    // this.carritoItems = this.db.collection('carritoItems').valueChanges();
    this.carritoItemsCollection = this.db.collection('carritoItems');
    this.carritoItems = this.carritoItemsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as CarritoItem;
        data.idCarritoItem = a.payload.doc.id;
        this.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  public getCarritoItems() {
    return this.carritoItems;
  }

  public deleteCarritoItem(carritoItem: CarritoItem) {
    this.carritoItemDoc = this.db.doc(`carritoItems/${carritoItem.idCarritoItem}`);
    this.carritoItemDoc.delete();
  }

  public addCarritoItem(carritoItem: CarritoItem) {
    this.carritoItemsCollection.add(carritoItem);
    carritoItem = this.id;
  }

  public updateCarritoItem(carritoItem: CarritoItem) {
    this.carritoItemDoc = this.db.doc(`carritoItems/${carritoItem.idCarritoItem}`);
    this.carritoItemDoc.update(carritoItem);
  }


}
