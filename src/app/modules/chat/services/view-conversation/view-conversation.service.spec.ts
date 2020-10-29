import { TestBed } from '@angular/core/testing';

import { ViewConversationService } from '../../pages/view-conversation/view-conversation.service';

describe('ViewConversationService', () => {
  let service: ViewConversationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewConversationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
