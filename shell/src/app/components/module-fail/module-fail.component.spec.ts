import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { findElByDataTestId } from '../../spec/find-elements.function';
import { ModuleFailComponent } from './module-fail.component';

describe('ModuleFailComponent', () => {
  let component: ModuleFailComponent;
  let fixture: ComponentFixture<ModuleFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuleFailComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleFailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('DEVE ser criado',
    () => expect(component).toBeTruthy());

  describe('QUANDO estiver offline', () => {
    beforeEach(() => {
      spyOnProperty(navigator, 'onLine', 'get').and.returnValue(false);
    })

    describe('E o componente for inicializado', () => {
      beforeEach(() => fixture.detectChanges())

      it('DEVE mostrar mensagem de offline',
        () => expect(findElByDataTestId(fixture, "module-fail-offline-message")).toBeTruthy());
    })
  })

  describe('QUANDO estiver online', () => {
    beforeEach(() => {
      spyOnProperty(navigator, 'onLine', 'get').and.returnValue(true);
    })

    describe('E o componente for inicializado', () => {
      beforeEach(() => fixture.detectChanges())

      it('DEVE mostrar mensagem de online',
        () => expect(findElByDataTestId(fixture, "module-fail-online-message")).toBeTruthy());
    })
  })
});
