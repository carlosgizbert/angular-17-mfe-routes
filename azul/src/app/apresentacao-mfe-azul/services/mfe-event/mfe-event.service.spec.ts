import { TestBed } from '@angular/core/testing';

import { MfeEventService } from './mfe-event.service';

describe('MfeEventService', () => {
  let service: MfeEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MfeEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
