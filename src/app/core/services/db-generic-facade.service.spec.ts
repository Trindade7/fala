import { TestBed } from '@angular/core/testing';

import { DbFacade } from './db.facade';

describe('DbFacade', () => {
  let service: DbFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
