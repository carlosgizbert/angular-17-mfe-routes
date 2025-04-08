import { MFEAzulData, MFEEventService } from '@/app/services/mfe-event/mfe-event.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class PageHomeComponent {
  private readonly mfeEventService: MFEEventService = inject(MFEEventService);
  private readonly MFE_AZUL_SHARED_EVENT_LISTENER = 'MFE_AZUL_SHARED_EVENT_NAME_LISTENER';

  sendDataToMFERoxo(): void {
    const data: MFEAzulData = {
      customMessage: 'Mensagem disparada do módulo AZUL!!!',
      customData: {
        description: 'Olá Chapter Team!',
        year: 2025,
      },
    };

    this.mfeEventService.dispatchEvent(
      this.MFE_AZUL_SHARED_EVENT_LISTENER,
      data
    );

    window.alert('Dados disparados');
  }
}
