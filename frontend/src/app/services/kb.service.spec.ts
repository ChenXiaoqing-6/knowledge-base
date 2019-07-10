import { TestBed } from '@angular/core/testing';

import { KbService } from './kb.service';

describe('KbaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KbService = TestBed.get(KbService);
    expect(service).toBeTruthy();
  });
});
