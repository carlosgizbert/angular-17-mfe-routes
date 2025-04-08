import { loadRemoteModule } from '@softarc/native-federation';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NativeFederationService {
  static readonly loadRemoteModule: typeof loadRemoteModule = loadRemoteModule;
}
