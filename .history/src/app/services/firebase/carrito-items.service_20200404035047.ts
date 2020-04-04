import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CarritoItemsService {

  carritoItemsCollection;
  carritoItemDoc;
  carritoItems;

  constructor(db: AngularFirestore) { }



  
}
