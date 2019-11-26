import { Component, OnInit } from '@angular/core';
import { Sucursal } from 'src/app/class/sucursal';

@Component({
  selector: 'app-sucursales-detalle',
  templateUrl: './sucursales-detalle.component.html',
  styleUrls: ['./sucursales-detalle.component.css']
})
export class SucursalesDetalleComponent implements OnInit {

  public sucursal: Sucursal;

  constructor() {
    this.sucursal = JSON.parse(localStorage.getItem('sucursalDetalle'));
   }

  onSubmit() {}

  ngOnInit() { this.sucursal = JSON.parse(localStorage.getItem('sucursalDetalle')); }
}
