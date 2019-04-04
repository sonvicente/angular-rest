import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioResolverGuard } from './usuario-resolver.guard';

describe('UsuarioResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioResolverGuard]
    });
  });

  it('should ...', inject([UsuarioResolverGuard], (guard: UsuarioResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
