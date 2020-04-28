import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmNoticiasComponent } from './abm-noticias.component';

describe('AbmNoticiasComponent', () => {
  let component: AbmNoticiasComponent;
  let fixture: ComponentFixture<AbmNoticiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmNoticiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
