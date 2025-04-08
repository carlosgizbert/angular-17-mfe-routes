import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  templateUrl: './maintenance.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaintenanceComponent { }
