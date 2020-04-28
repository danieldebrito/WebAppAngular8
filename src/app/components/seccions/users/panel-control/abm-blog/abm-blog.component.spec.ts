import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmBlogComponent } from './abm-blog.component';

describe('AbmBlogComponent', () => {
  let component: AbmBlogComponent;
  let fixture: ComponentFixture<AbmBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
