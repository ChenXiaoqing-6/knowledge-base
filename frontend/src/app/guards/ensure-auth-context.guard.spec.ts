import { TestBed, inject } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { EnsureAuthContextGuard } from './ensure-auth-context.guard';
import { reducer } from '../../authContext/authContext.reducer';
import { State } from '../../authContext/authContext.state';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import * as sinon from 'sinon';

const getMockedStore = (state: { authContext: State }) => {
  return {
    dispatch: sinon.spy(),
    select: sinon.stub().callsFake(fn => of(fn(state)))
  };
};

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


  it('should return [true] if [authToken] is set', (done) => {

    const storeMock = getMockedStore({
      authContext: {
        cloudHost: 'somehost',
        authToken: 'some-token-in-store',
        user: 'manager',
        userId: '1',
        accountId: '1',
        account: 'core-drsl-et',
        company: 'some',
        companyId: '1'
      }
    });

    const stream$ = new EnsureAuthContextGuard(storeMock as any)
      .canActivate({} as any) as Observable<boolean>;

    stream$
      .subscribe((it) => {

        expect(it).toBe(true);
        done();

      });

  });

});
