import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbaListItemComponent } from './kba-list-item.component';

describe('KbaListItemComponent', () => {
  let component: KbaListItemComponent;
  let fixture: ComponentFixture<KbaListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbaListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbaListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
