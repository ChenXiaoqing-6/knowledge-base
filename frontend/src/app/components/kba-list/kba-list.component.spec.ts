import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbaListComponent } from './kba-list.component';

describe('KbaListComponent', () => {
  let component: KbaListComponent;
  let fixture: ComponentFixture<KbaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
