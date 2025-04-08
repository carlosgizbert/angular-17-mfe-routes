import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WebPackModule } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class RemoteModulesHttpService {

  remoteModules: WebPackModule[] = [
     {
      id: crypto.randomUUID(),
      routePath: 'blue',
      remoteEntry: 'http://localhost:4201/remoteEntry.json',
      remoteName: 'apresentacao-mfe-azul',
      exposedModule: './MfeModule',
      moduleName: 'MfeModule',
      owner: 'shell',
      type: 'ROUTE',
      createdDate: '2024-10-17T12:00:00Z',
      lastModifiedDate: '2024-10-17T12:00:00Z',
      data: {} as Map<string, string>,
    },
    {
      id: crypto.randomUUID(),
      routePath: 'purple',
      remoteEntry: 'http://localhost:4202/remoteEntry.json',
      remoteName: 'apresentacao-mfe-purple',
      exposedModule: './MfeModule',
      moduleName: 'MfeModule',
      owner: 'shell',
      type: 'ROUTE',
      createdDate: '2024-10-17T12:00:00Z',
      lastModifiedDate: '2024-10-17T12:00:00Z',
      data: {} as Map<string, string>,
    },
  ];

  getRemoteModules(): Observable<WebPackModule[]> {
    return of(this.remoteModules);
  }
}
