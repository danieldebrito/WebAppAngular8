import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CarritoItem } from 'src/app/class/carritoItem';

@Injectable({
  providedIn: 'root'
})
export class CarritoItemsService {

  carritoItemsCollection;
  carritoItemDoc;
  carritoItems;

  constructor(db: AngularFirestore) { }




}
