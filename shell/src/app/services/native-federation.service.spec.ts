import { TestBed } from '@angular/core/testing';

import { NativeFederationService } from './native-federation.service';

describe('ModuleFederationService', () => {
  let service: NativeFederationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NativeFederationService]
    });

    service = TestBed.inject(NativeFederationService);
  });

  it('DEVE ser injetado corretamente', () => expect(service).toBeTruthy());
});
