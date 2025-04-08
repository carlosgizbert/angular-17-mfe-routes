import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface MFEAzulData {
  customMessage: string;
  customData: {
    description: string;
    year: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class SharedDataService implements OnDestroy {
  private readonly MFE_AZUL_SHARED_EVENT_LISTENER = 'MFE_AZUL_SHARED_EVENT_NAME_LISTENER';
  private readonly MFE_AZUL_SHARED_DATA_LEYER = 'MFE_AZUL_SHARED_DATA';
  private readonly listener = (event: Event) => this.updateData(event);

  sharedData$ = new BehaviorSubject<MFEAzulData | null>(null);

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    window.addEventListener(this.MFE_AZUL_SHARED_EVENT_LISTENER, this.listener);
    this.loadInitialData();
  }

  private updateData(event: Event): void {
    const data = (event as CustomEvent<MFEAzulData>).detail;
    if (data) {
      this.sharedData$.next(data);
    }
  }

  private loadInitialData(): void {
    const data = (window as any)[this.MFE_AZUL_SHARED_DATA_LEYER];
    if (data) {
      this.sharedData$.next(data);
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener(
      this.MFE_AZUL_SHARED_EVENT_LISTENER,
      this.listener
    );
  }
}
