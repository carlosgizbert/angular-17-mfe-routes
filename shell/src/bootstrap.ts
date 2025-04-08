import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { MaintenanceComponent } from './app/components/maintenance/maintenance.component';

bootstrapApplication(AppComponent, appConfig)
  .catch(() => bootstrapApplication(MaintenanceComponent));