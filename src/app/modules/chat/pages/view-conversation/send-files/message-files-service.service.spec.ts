import { TestBed } from '@angular/core/testing';

import { MessageFilesService } from './message-files.service';

describe('MessageFilesService', () => {
  let service: MessageFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
