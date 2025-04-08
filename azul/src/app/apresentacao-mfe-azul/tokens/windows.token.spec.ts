import { TestBed } from '@angular/core/testing';
import { WINDOW } from './window.token';

describe('WINDOW InjectionToken', () => {
  it('should provide the global window object', () => {
    TestBed.configureTestingModule({});
    const injectedWindow = TestBed.inject(WINDOW);

    expect(injectedWindow).toBe(window);
  });

  describe('when mocking the window object', () => {
    beforeEach(() => {
      const mockWindow = { location: { href: 'https://mockurl.com' } } as Window;

      TestBed.configureTestingModule({
        providers: [{ provide: WINDOW, useValue: mockWindow }],
      });
    });

    it('should allow mocking of the window object', () => {
      const overriddenWindow = TestBed.inject(WINDOW);

      expect(overriddenWindow.location.href).toBe('https://mockurl.com');
    });
  });
});
