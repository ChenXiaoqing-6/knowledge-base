/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FundamentalNgxModule } from 'fundamental-ngx';

import { KbLinkedListComponent } from './kb-linked-list.component';

describe('KbLinkedListComponent', () => {
  let component: KbLinkedListComponent;
  let fixture: ComponentFixture<KbLinkedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KbLinkedListComponent],
      imports: [FundamentalNgxModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbLinkedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});