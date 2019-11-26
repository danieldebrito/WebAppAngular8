import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalesListadoComponent } from './sucursales-listado.component';

describe('SucursalesListadoComponent', () => {
  let component: SucursalesListadoComponent;
  let fixture: ComponentFixture<SucursalesListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalesListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalesListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
