import { TestBed } from '@angular/core/testing';

import { BattlesApiService } from './battles-api.service';

describe('BattlesApiService', () => {
  let service: BattlesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattlesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
