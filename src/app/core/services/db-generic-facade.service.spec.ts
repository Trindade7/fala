import { TestBed } from '@angular/core/testing';

import { DbGenericFacadeService } from './db-generic-facade.service';

describe('DbGenericFacadeService', () => {
  let service: DbGenericFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbGenericFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
