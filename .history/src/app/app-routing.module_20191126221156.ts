import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/seccions/home/home.component';
import { CatalogComponent } from './components/seccions/catalog/catalog.component';
import { DetailComponent } from './components/seccions/catalog/detail/detail.component';
import { ContactComponent } from './components/seccions/contact/contact.component';
import { BlogComponent } from './components/seccions/dtoTecnico/blog/blog.component';
import { LoginComponent } from './components/seccions/clientes/login/login.component';

const appRoutes: Routes = [
  // mantenimiento
  // { path: 'correctivos', component: CorrectivoTabsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'detalle', component: DetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent },
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
