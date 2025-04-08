import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { RoutesConfigService } from './services/routes-config.service';

function initializeApp(routesConfigService: RoutesConfigService) {
  return async () => {
    await routesConfigService.configureRoutes();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]),
    provideHttpClient(),
    RoutesConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [RoutesConfigService],
      multi: true,
    }
  ]
};
