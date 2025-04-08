import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RoutesConfigService } from './routes-config.service';
import { LoadModulesService } from './load-modules.service';
import { Route, Router } from '@angular/router';
import { WebPackModuleMock } from '../spec/webpack-modules.mock';
import { WebPackModule } from '../models';
import { NativeFederationService } from './native-federation.service';
import { ModuleFailModule } from '../components/module-fail/module-fail.module';

describe('RoutesConfigService', () => {
  let service: RoutesConfigService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        RoutesConfigService,
        {
          provide: LoadModulesService,
          useValue: {
            loadWebpackModules: () => [
              WebPackModuleMock.genOne(1),
              WebPackModuleMock.genOne(2, "COMPONENT")
            ]
          }
        }
      ]
    });

    service = TestBed.inject(RoutesConfigService);
    router = TestBed.inject(Router);
  });

  it('DEVE ser injetado corretamente', () => expect(service).toBeTruthy());

  describe('QUANDO configureRoutes for chamado', () => {
    let spy: jasmine.Spy;

    beforeEach(fakeAsync(() => {
      spy = spyOn(router, 'resetConfig');

      service.configureRoutes()
    }));

    it('DEVE chamar a função resetConfig',
      () => expect(spy).toHaveBeenCalled())
  })

  describe('DADO que o módulo NÃO carregue corretamente', () => {
    const webpackModule: WebPackModule = WebPackModuleMock.genOne(1);

    let route: Route;
    let loadChildren: unknown;
    let moduleFailModule: typeof ModuleFailModule;

    beforeEach(async () => {
      spyOn(NativeFederationService, 'loadRemoteModule').and.returnValue(
        Promise.reject(new Error('Module loading failed'))
      );

      route = service.toRoutes(webpackModule);
      loadChildren = await route.loadChildren!();
      moduleFailModule = await import('../components/module-fail/module-fail.module')
        .then(m => m.ModuleFailModule);
    })

    it('DEVE carregar o componente de erro de módulo', () => {
      expect(loadChildren).toEqual(moduleFailModule);
    });
  })

  describe('DADO que o módulo carregue corretamente', () => {
    const webpackModule: WebPackModule = WebPackModuleMock.genOne(1);
    const moduleMock = { test: 1 };

    let route: Route;
    let loadChildren: unknown;

    beforeEach(async () => {
      spyOn(NativeFederationService, 'loadRemoteModule').and.returnValue(
        Promise.resolve({ [webpackModule.moduleName]: moduleMock })
      );

      route = service.toRoutes(webpackModule);
      loadChildren = await route.loadChildren!();
    })

    it('DEVE carregar o componente de erro de módulo',
      () => expect(loadChildren).toEqual(moduleMock));
  })
})
