import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/seccions/home/home.component';
import { FilterComponent } from './components/seccions/catalog/filter/filter.component';
import { DetailComponent } from './components/seccions/catalog/detail/detail.component';
import { ContactComponent } from './components/seccions/contact/contact.component';
import { LoginComponent } from './components/seccions/clientes/login/login.component';
import { PageNotFoundComponent } from './components/seccions/page-not-found/page-not-found.component';
import { QuienSoyComponent } from './components/seccions/ayuda/quien-soy/quien-soy.component';
import { RegistroComponent } from './components/seccions/clientes/registro/registro.component';
import { RecupPasswordComponent } from './components/seccions/clientes/recup-password/recup-password.component';
import { ClienteTabsComponent } from './components/seccions/clientes/cliente-tabs/cliente-tabs.component';
import { PedidosTabsComponent } from './components/seccions/pedidos/pedidos-tabs/pedidos-tabs.component';
import { SucursalesNuevaComponent } from './components/seccions/clientes/sucursales-nueva/sucursales-nueva.component';
import { SucursalesDetalleComponent } from './components/seccions/clientes/sucursales-detalle/sucursales-detalle.component';
// nosotros
import { HistoriaComponent } from './components/seccions/nosotros/historia/historia.component';
import { CertificacionesComponent } from './components/seccions/nosotros/certificaciones/certificaciones.component';
import { ProductosComponent } from './components/seccions/nosotros/productos/productos.component';
import { InstruccionesComponent } from './components/seccions/ayuda/instrucciones/instrucciones.component';
import { NovedadesComponent } from './components/seccions/nosotros/novedades/novedades.component';
// dto tecnico
import { BlogComponent } from './components/seccions/dtoTecnico/blog/blog.component';
import { AprieteComponent } from './components/seccions/dtoTecnico/apriete/apriete.component';
import { RetenesInfoComponent } from './components/seccions/dtoTecnico/retenes-info/retenes-info.component';
import { BulonesInfoComponent } from './components/seccions/dtoTecnico/bulones-info/bulones-info.component';
// pedidos
import { PedidosListadoComponent } from './components/seccions/pedidos/pedidos-listado/pedidos-listado.component';

// cpanel
import { PanelControlComponent } from './components/seccions/users/panel-control/panel-control.component';
import { PanelHomeComponent } from './components/seccions/users/panel-control/panel-home/panel-home.component';
import { MensajesComponent } from './components/seccions/users/panel-control/mensajes/mensajes.component';
import { PedidosComponent } from './components/seccions/users/panel-control/pedidos/pedidos.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'catalogo', component: FilterComponent },
  { path: 'detalle', component: DetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: QuienSoyComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recupPass', component: RecupPasswordComponent },
  { path: 'misDatos', component: ClienteTabsComponent },
  { path: 'carrito', component: PedidosTabsComponent },
  { path: 'sucursal', component: SucursalesDetalleComponent },
  { path: 'sucursalNueva', component: SucursalesNuevaComponent },
  { path: 'historia', component: HistoriaComponent },
  { path: 'novedades', component: NovedadesComponent },
  { path: 'certificaciones', component: CertificacionesComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'instrucciones', component: InstruccionesComponent },
  { path: 'apriete', component: AprieteComponent },
  { path: 'retenes', component: RetenesInfoComponent },
  { path: 'bulones', component: BulonesInfoComponent },
  { path: 'pedidos', component: PedidosListadoComponent },
  {
    path: 'control',
    component: PanelControlComponent,
    children:
      [{ path: '', component: PanelHomeComponent },
      { path: 'pedidoslistado', component: PedidosComponent },
      { path: 'mensajes', component: MensajesComponent }]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
    // other imports here
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
