import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/seccions/home/home.component';
import { CatalogComponent } from './components/seccions/catalog/catalog.component';
import { DetailComponent } from './components/seccions/catalog/detail/detail.component';
import { ContactComponent } from './components/seccions/contact/contact.component';
import { BlogComponent } from './components/seccions/dtoTecnico/blog/blog.component';
import { LoginComponent } from './components/seccions/clientes/login/login.component';
import { PageNotFoundComponent } from './components/seccions/page-not-found/page-not-found.component';
import { QuienSoyComponent } from './components/seccions/quien-soy/quien-soy.component';
import { RegistroComponent } from './components/seccions/clientes/registro/registro.component';
import { RecupPasswordComponent } from './components/seccions/clientes/recup-password/recup-password.component';
import { ClienteTabsComponent } from './components/seccions/clientes/cliente-tabs/cliente-tabs.component';
import { PedidosTabsComponent } from './components/seccions/pedidos/pedidos-tabs/pedidos-tabs.component';
import { PanelControlComponent } from './components/seccions/users/panel-control/panel-control.component';
import { SucursalesNuevaComponent } from './components/seccions/clientes/sucursales-nueva/sucursales-nueva.component';
import { SucursalesDetalleComponent } from './components/seccions/clientes/sucursales-detalle/sucursales-detalle.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'catalogo', component: CatalogComponent },
  { path: 'detalle', component: DetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: QuienSoyComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recupPass', component: RecupPasswordComponent },
  { path: 'misDatos', component: ClienteTabsComponent },
  { path: 'carrito', component: PedidosTabsComponent },
  { path: 'control', component: PanelControlComponent },
  { path: 'sucursal', component: SucursalesDetalleComponent },
  { path: 'sucursalNueva', component: SucursalesNuevaComponent },
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
