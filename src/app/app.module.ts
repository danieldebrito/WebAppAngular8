import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// styles
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';

// components
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/layout/nav-bar/nav-bar.component';
import { HomeComponent } from './components/seccions/home/home.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MainComponent } from './components/layout/main/main.component';
import { CarouselComponent } from './components/seccions/home/carousel/carousel.component';
import { CatalogComponent } from './components/seccions/catalog/catalog.component';
import { FilterComponent } from './components/seccions/catalog/filter/filter.component';
import { DetailComponent } from './components/seccions/catalog/detail/detail.component';
import { CardsComponent } from './components/seccions/catalog/cards/cards.component';
import { ListComponent } from './components/seccions/catalog/list/list.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    FooterComponent,
    LayoutComponent,
    MainComponent,
    CarouselComponent,
    CatalogComponent,
    FilterComponent,
    DetailComponent,
    CardsComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
