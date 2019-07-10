import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbArticleListComponent } from './kb-article-list.component';

describe('KbArticleListComponent', () => {
  let component: KbArticleListComponent;
  let fixture: ComponentFixture<KbArticleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbArticleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
