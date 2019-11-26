import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalesNuevaComponent } from './sucursales-nueva.component';

describe('SucursalesNuevaComponent', () => {
  let component: SucursalesNuevaComponent;
  let fixture: ComponentFixture<SucursalesNuevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalesNuevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalesNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
