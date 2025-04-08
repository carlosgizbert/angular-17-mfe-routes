import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingModuleGuard {
  public inLoading = false;

  canLoad(): void {
    this.inLoading = true;
  }

  canActivate(): void {
    this.inLoading = false;
  }
}
