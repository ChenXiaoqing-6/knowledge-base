import { TestBed } from '@angular/core/testing';

import { KbaService } from './kba.service';

describe('KbaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KbaService = TestBed.get(KbaService);
    expect(service).toBeTruthy();
  });
});
