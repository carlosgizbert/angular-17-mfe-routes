import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';

import { WebPackModule } from '../models';
import { WebPackModuleMock } from '../spec/webpack-modules.mock';
import { RemoteModulesHttpService } from './http/remote-modules-http.service';
import { LoadModulesService } from './load-modules.service';

const remoteModules: WebPackModule[] = WebPackModuleMock.genList(2);
const newModule: WebPackModule = WebPackModuleMock.genOne(3);

describe('LoadModulesService', () => {
  let service: LoadModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoadModulesService,
        { provide: ActivatedRoute, useValue: { data: of({}) } },
        {
          provide: RemoteModulesHttpService,
          useValue: { getRemoteModules: (): Observable<WebPackModule[]> => of([...remoteModules]) }
        }
      ]
    });

    service = TestBed.inject(LoadModulesService);
  });

  describe('DADO que contenham novos dados no localStorage', () => {
    beforeEach(() => {
      sessionStorage.removeItem('moduleOverrides')
      localStorage.setItem('moduleOverrides', JSON.stringify([newModule]))
    })

    describe('QUANDO loadWebpackModules for chamado', () => {
      beforeEach(() => service.loadWebpackModules());

      it('DEVE adicionar os novos dados no localStorage', () => {
        expect(service.webPackModules).toEqual(remoteModules.concat(newModule));
      })
    })
  })

  describe('DADO que contenham novos dados no sessionStorage', () => {
    beforeEach(() => {
      localStorage.removeItem('moduleOverrides')
      sessionStorage.setItem('moduleOverrides', JSON.stringify([newModule]))
    })

    describe('QUANDO loadWebpackModules for chamado', () => {
      beforeEach(() => service.loadWebpackModules());

      it('DEVE adicionar os novos dados no sessionStorage', () => {
        expect(service.webPackModules).toEqual(remoteModules.concat(newModule));
      })
    })
  })

  describe('DADO que contenham dados inválidos no sessionStorage', () => {
    beforeEach(() => {
      sessionStorage.removeItem('moduleOverrides')
      localStorage.setItem('moduleOverrides', JSON.stringify([{ id: "any" }]))
    })

    describe('QUANDO loadWebpackModules for chamado', () => {
      it('DEVE adicionar os novos dados no sessionStorage', () => {
        expect(fakeAsync(() => service.loadWebpackModules())).toThrowError();
      })
    })
  })

  describe('DADO que seja passado os parametros via url', () => {
    const pathModule = WebPackModuleMock.genPatch(1);

    beforeEach(() => {
      localStorage.removeItem('moduleOverrides')
      sessionStorage.removeItem('moduleOverrides')

      window.history.pushState(
        {}, '',
        `http://localhost?moduleOverrideId=${pathModule.id}&moduleOverrideRemoteEntry=${pathModule.remoteEntry}`
      );
    });

    describe('QUANDO loadWebpackModules for chamado', () => {
      beforeEach(() => service.loadWebpackModules());

      it('DEVE adicionar os novos dados no sessionStorage', () => {
        expect(service.webPackModules).toEqual([
          { ...remoteModules[0], remoteEntry: pathModule.remoteEntry! },
          remoteModules[1]
        ]);
      })
    })
  })
})
