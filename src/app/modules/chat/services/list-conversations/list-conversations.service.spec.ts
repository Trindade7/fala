import { TestBed } from '@angular/core/testing';

import { ListConversationsService } from './list-conversations.service';

describe('ListConversationsService', () => {
  let service: ListConversationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListConversationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
