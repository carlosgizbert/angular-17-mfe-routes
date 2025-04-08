import { Injectable } from '@angular/core';

export interface MFEAzulData {
  customMessage: string;
  customData: {
    description: string;
    year: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class MFEEventService {
  private readonly MFE_AZUL_SHARED_DATA_LEYER = 'MFE_AZUL_SHARED_DATA';

  dispatchEvent(eventName: string, data: MFEAzulData): void {
    const event = new CustomEvent(eventName, {
      detail: data,
      bubbles: true,
    });
    window.dispatchEvent(event);

    (window as any)[this.MFE_AZUL_SHARED_DATA_LEYER] = data;
  }
}
