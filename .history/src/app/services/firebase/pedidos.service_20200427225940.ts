import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pedido } from 'src/app/class/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  pedidosCollection: AngularFirestoreCollection<Pedido>;
  pedidoDoc: AngularFirestoreDocument<Pedido>;
  pedidos: Observable<Pedido[]>;

  public idPedido;

  constructor(public db: AngularFirestore) {
    this.pedidosCollection = this.db.collection('pedidos');
    this.pedidos = this.pedidosCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Pedido;
        data.idPedido = a.payload.doc.id;
        this.idPedido = data.idPedido;
        return data;
      });
    }));
  }

  public getPedidos() {
    return this.pedidos;
  }

  public deletePedido(pedido: Pedido) {
    this.pedidoDoc = this.db.doc(`pedidos/${pedido.idPedido}`);
    this.pedidoDoc.delete();
  }

  public async addPedido(pedido: Pedido) {
    this.pedidosCollection.add(pedido);
    pedido = this.idPedido;
  }

  public updatePedido(pedido: Pedido) {
    this.pedidoDoc = this.db.doc(`pedidos/${pedido.idPedido}`);
    this.pedidoDoc.update(pedido);
  }
}
