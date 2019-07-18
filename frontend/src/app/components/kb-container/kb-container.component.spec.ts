/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { Component } from '@angular/core';
import { KbContainerComponent } from './kb-container.component';

@Component({ selector: 'app-kb-search', template: '' })
class KbSearchComponent {
}

@Component({ selector: 'app-kb-linked-list', template: '' })
class KbLinkedListComponent {
}

describe('KbContainerComponent', () => {
  let component: KbContainerComponent;
  let fixture: ComponentFixture<KbContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KbContainerComponent,
        KbSearchComponent,
        KbLinkedListComponent,
      ],
      imports: [FundamentalNgxModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
