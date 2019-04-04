import { TestBed } from '@angular/core/testing';

import { Usuarios2Service } from './usuarios2.service';

describe('Usuarios2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Usuarios2Service = TestBed.get(Usuarios2Service);
    expect(service).toBeTruthy();
  });
});
