import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';

import { LoadModulesService } from '../../services/load-modules.service';
import { NativeFederationService } from '../../services/native-federation.service';
import { RemoteComponentComponent } from './remote-component.component';
import { ViewContainerRef } from '@angular/core';
import { WebPackModuleMock } from '../../spec/webpack-modules.mock';
import { WebPackModule } from '../../models';

describe('RemoteComponentComponent', () => {
  const remoteModules: WebPackModule[] = WebPackModuleMock.genList(1);

  let component: RemoteComponentComponent;
  let fixture: ComponentFixture<RemoteComponentComponent>;

  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoteComponentComponent],
      providers: [
        ViewContainerRef,
        { provide: ActivatedRoute, useValue: { data: of({}) } },
        {
          provide: LoadModulesService,
          useValue: { webPackModules: remoteModules }
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteComponentComponent);
    component = fixture.componentInstance;

    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  describe('QUANDO o componente for carregado diretamente da tela', () => {
    let spy: jasmine.Spy;

    beforeEach(() => activatedRoute.data = of({}))

    describe('E o módulo existir', () => {
      beforeEach(() => {
        component.remoteName = remoteModules[0].remoteName;

        spyOn(NativeFederationService, 'loadRemoteModule').and
          .returnValues(Promise.resolve({ [remoteModules[0].moduleName]: '' }));

        spy = spyOn(component.viewContainerRef, 'createComponent')
      })

      describe('E o componente for inicializado', () => {
        beforeEach(fakeAsync(() => {
          fixture.detectChanges();
          tick(1000);
        }))

        it('DEVE chamar a função de cria o componente',
          () => expect(spy).toHaveBeenCalled())
      })
    })
  })

  describe('QUANDO componente for carregado pelo arquivo de rotas E o módulo não existir', () => {
    beforeEach(() => activatedRoute.data = of({ remoteName: 'teste' }))

    describe('E o componente for inicializado', () => {
      it('DEVE emitir uma exceção de error', () => {
        expect(fakeAsync(() => {
          fixture.detectChanges();
          tick(1000);
        })).toThrowError();
      })
    })
  })
});
