import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// styles
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// components
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/layout/nav-bar/nav-bar.component';
import { HomeComponent } from './components/seccions/home/home.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MainComponent } from './components/layout/main/main.component';
import { CarouselComponent } from './components/seccions/home/carousel/carousel.component';
import { FilterComponent } from './components/seccions/catalog/filter/filter.component';
import { DetailComponent } from './components/seccions/catalog/detail/detail.component';
import { CardsComponent } from './components/seccions/catalog/cards/cards.component';
import { ListComponent } from './components/seccions/catalog/list/list.component';
import { PreNavComponent } from './components/layout/nav-bar/pre-nav/pre-nav.component';
import { PreFooterComponent } from './components/layout/footer/pre-footer/pre-footer.component';
import { TablaCompJgosComponent } from './components/seccions/catalog/tabla-comp-jgos/tabla-comp-jgos.component';
import { TablaProdVersionComponent } from './components/seccions/catalog/tabla-prod-version/tabla-prod-version.component';
import { ContactComponent } from './components/seccions/contact/contact.component';
import { BotonComprarComponent } from './components/seccions/pedidos/boton-comprar/boton-comprar.component';
import { ClienteTabsComponent } from './components/seccions/clientes/cliente-tabs/cliente-tabs.component';
import { LoginComponent } from './components/seccions/clientes/login/login.component';
import { MisDatosComponent } from './components/seccions/clientes/mis-datos/mis-datos.component';
import { RecupPasswordComponent } from './components/seccions/clientes/recup-password/recup-password.component';
import { RegistroComponent } from './components/seccions/clientes/registro/registro.component';
import { SucursalesDetalleComponent } from './components/seccions/clientes/sucursales-detalle/sucursales-detalle.component';
import { SucursalesListadoComponent } from './components/seccions/clientes/sucursales-listado/sucursales-listado.component';
import { SucursalesNuevaComponent } from './components/seccions/clientes/sucursales-nueva/sucursales-nueva.component';
import { PageNotFoundComponent } from './components/seccions/page-not-found/page-not-found.component';
import { CarritoComponent } from './components/seccions/pedidos/carrito/carrito.component';
import { PedidosListadoComponent } from './components/seccions/pedidos/pedidos-listado/pedidos-listado.component';
import { PedidosTabsComponent } from './components/seccions/pedidos/pedidos-tabs/pedidos-tabs.component';
import { QuienSoyComponent } from './components/seccions/ayuda/quien-soy/quien-soy.component';
import { AbmExpresosComponent } from './components/seccions/clientes/abm-expresos/abm-expresos.component';

// pedidos

// nosotros
import { HistoriaComponent } from './components/seccions/nosotros/historia/historia.component';
import { CertificacionesComponent } from './components/seccions/nosotros/certificaciones/certificaciones.component';
import { ProductosComponent } from './components/seccions/nosotros/productos/productos.component';
import { NovedadesComponent } from './components/seccions/nosotros/novedades/novedades.component';
// dto tecnico
import { BlogComponent } from './components/seccions/dtoTecnico/blog/blog.component';
import { InstruccionesComponent } from './components/seccions/ayuda/instrucciones/instrucciones.component';
import { AprieteComponent } from './components/seccions/dtoTecnico/apriete/apriete.component';
import { RetenesInfoComponent } from './components/seccions/dtoTecnico/retenes-info/retenes-info.component';
import { BulonesInfoComponent } from './components/seccions/dtoTecnico/bulones-info/bulones-info.component';
import { CompeticionPipe } from './pipes/competicion.pipe';
import { EnPromoPipe } from './pipes/en-promo.pipe';
import { NuevoProductoPipe } from './pipes/nuevo-producto.pipe';

// firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PedidosService } from 'src/app/services/firebase/pedidos.service';
import { CarritoItemsService } from 'src/app/services/firebase/carrito-items.service';

// cpanel
import { SidebarComponent } from './components/seccions/users/panel-control/sidebar/sidebar.component';
import { TopbarComponent } from './components/seccions/users/panel-control/topbar/topbar.component';
import { PanelHomeComponent } from './components/seccions/users/panel-control/panel-home/panel-home.component';
import { MensajesComponent } from './components/seccions/users/panel-control/mensajes/mensajes.component';
import { PedidosComponent } from './components/seccions/users/panel-control/pedidos/pedidos.component';
import { ClientesComponent } from './components/seccions/users/panel-control/clientes/clientes.component';
import { UsersTabsComponent } from './components/seccions/users/users-tabs/users-tabs.component';
import { AbmNoticiasComponent } from './components/seccions/users/panel-control/abm-noticias/abm-noticias.component';
import { AbmBlogComponent } from './components/seccions/users/panel-control/abm-blog/abm-blog.component';
import { AbmArticulosComponent } from './components/seccions/users/panel-control/abm-articulos/abm-articulos.component';
import { PanelControlComponent } from './components/seccions/users/panel-control/panel-control.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    FooterComponent,
    LayoutComponent,
    MainComponent,
    CarouselComponent,
    FilterComponent,
    DetailComponent,
    CardsComponent,
    ListComponent,
    PreNavComponent,
    PreFooterComponent,
    TablaCompJgosComponent,
    TablaProdVersionComponent,
    ContactComponent,
    BlogComponent,
    BotonComprarComponent,
    ClienteTabsComponent,
    LoginComponent,
    MisDatosComponent,
    RecupPasswordComponent,
    RegistroComponent,
    SucursalesDetalleComponent,
    SucursalesListadoComponent,
    SucursalesNuevaComponent,
    PageNotFoundComponent,
    CarritoComponent,
    PedidosListadoComponent,
    PedidosTabsComponent,
    QuienSoyComponent,
    AbmExpresosComponent,
    PanelControlComponent,
    HistoriaComponent,
    CertificacionesComponent,
    ProductosComponent,
    InstruccionesComponent,
    AprieteComponent,
    RetenesInfoComponent,
    BulonesInfoComponent,
    NovedadesComponent,
    CompeticionPipe,
    EnPromoPipe,
    NuevoProductoPipe,
    SidebarComponent,
    TopbarComponent,
    PanelHomeComponent,
    MensajesComponent,
    PedidosComponent,
    ClientesComponent,
    UsersTabsComponent,
    AbmNoticiasComponent,
    AbmBlogComponent,
    AbmArticulosComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [
    PedidosService,
    CarritoItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
