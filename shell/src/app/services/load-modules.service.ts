import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';

import { REQUIRED_KEYS_WEBPACK_MODULE, WebPackModule } from '../models';
import { RemoteModulesHttpService } from './http/remote-modules-http.service';

@Injectable({
  providedIn: 'root'
})
export class LoadModulesService {
  private readonly STORAGE_KEY = 'moduleOverrides';

  private _webpackModules: WebPackModule[] = [];
  private _remoteWebpackModules: WebPackModule[] = [];
  private _localWebpackModules: Partial<WebPackModule>[] = [];

  get webPackModules(): WebPackModule[] {
    return this._webpackModules;
  }

  constructor(private readonly remoteModulesService: RemoteModulesHttpService) { }

  public async loadWebpackModules(): Promise<WebPackModule[]> {
    await this.loadRemoteWebpackModules();
    this.loadLocalWebpackModules();
    this.mergeRemoteAndLocalWebpackModules();
    return this.webPackModules;
  }

  private async loadRemoteWebpackModules() {
    this._remoteWebpackModules = await lastValueFrom(this.remoteModulesService.getRemoteModules())
    console.debug('Remote Modules: ', this._remoteWebpackModules);
  }

  private loadLocalWebpackModules() {
    const localStorageModules = JSON.parse(localStorage.getItem(this.STORAGE_KEY) ?? '[]');
    const sessionStorageModules = JSON.parse(sessionStorage.getItem(this.STORAGE_KEY) ?? '[]');
    const queryParamsModules = this.getQueryParamsWebpackModules();

    this._localWebpackModules = this.mergeLocalWebpackModules(this._localWebpackModules, localStorageModules);
    this._localWebpackModules = this.mergeLocalWebpackModules(this._localWebpackModules, sessionStorageModules);
    this._localWebpackModules = this.mergeLocalWebpackModules(this._localWebpackModules, queryParamsModules);

    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._localWebpackModules));

    console.debug('Local Modules: ', this._localWebpackModules);
  }

  private getQueryParamsWebpackModules(): Partial<WebPackModule>[] {
    const url = new URL(window.location.toString());

    const moduleOverrideIds = url.searchParams.getAll('moduleOverrideId');
    const moduleOverrideRemoteEntries = url.searchParams.getAll('moduleOverrideRemoteEntry');

    const queryParamsModulesLength = Math.min(moduleOverrideIds.length, moduleOverrideRemoteEntries.length);

    const modulesToOverride = moduleOverrideIds.slice(0, queryParamsModulesLength)
      .map((id, index) => ({ id, remoteEntry: moduleOverrideRemoteEntries[index] }));

    url.searchParams.delete('moduleOverrideId');
    url.searchParams.delete('moduleOverrideRemoteEntry');
    window.history.pushState({}, '', url.toString());

    return modulesToOverride;
  }

  private mergeLocalWebpackModules(origin: Partial<WebPackModule>[], destination: Partial<WebPackModule>[]) {
    const originMap = new Map(origin.map(item => [item.id, item]));

    destination.forEach(item => originMap.set(item.id, item));

    return Array.from(originMap.values());
  }

  private mergeRemoteAndLocalWebpackModules() {
    this._webpackModules = this._remoteWebpackModules

    this._localWebpackModules
      .forEach((partialModule) => this.addOrChangeModuleInWebpackModules(partialModule));

    console.debug('Final WebPackModules: ', this._webpackModules);
  }

  private addOrChangeModuleInWebpackModules(partialModule: Partial<WebPackModule>) {
    const index = this._webpackModules
      .findIndex((remoteModule) => partialModule.id === remoteModule.id);

    if (index >= 0) {
      this._webpackModules[index] = { ...this._webpackModules[index], ...partialModule };
      console.debug('Overriding WebPackModule: ', this._webpackModules[index]);
      return
    }

    REQUIRED_KEYS_WEBPACK_MODULE.forEach((prop) => {
      if (!partialModule[prop]) {
        throw new Error(`Module is invalid: ${prop} is missing`);
      }
    })

    this._webpackModules.push(partialModule as WebPackModule);
    console.debug('Add as new WebPackModule: ', partialModule);
  }
}
