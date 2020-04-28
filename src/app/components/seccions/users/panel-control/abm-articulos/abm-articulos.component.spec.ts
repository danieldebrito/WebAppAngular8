import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmArticulosComponent } from './abm-articulos.component';

describe('AbmArticulosComponent', () => {
  let component: AbmArticulosComponent;
  let fixture: ComponentFixture<AbmArticulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmArticulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
