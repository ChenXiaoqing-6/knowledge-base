import { TestBed, inject } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { EnsureAuthContextGuard } from './ensure-auth-context.guard';
import { reducer } from '../state/authContext/authContext.reducer';

describe('EnsureAuthContextGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnsureAuthContextGuard],
      imports: [
        StoreModule.forRoot({ authContext: reducer })
      ]
    });
  });

  it('should mount', inject([EnsureAuthContextGuard], (guard: EnsureAuthContextGuard) => {
    expect(guard).toBeTruthy();
  }));

});
