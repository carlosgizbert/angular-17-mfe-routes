import { LoadingModuleGuard } from './loading-module.guard';

describe('LoadingModuleGuard', () => {
  const guard = new LoadingModuleGuard();

  describe('QUANDO chamar a função canLoad', () => {
    beforeEach(() => guard.canLoad())

    it('DEVE setar inLoading para TRUE',
      () => expect(guard.inLoading).toBeTruthy())
  })

  describe('QUANDO chamar a função canActivate', () => {
    beforeEach(() => guard.canActivate())

    it('DEVE setar inLoading para FALSE',
      () => expect(guard.inLoading).toBeFalsy())
  })
})
