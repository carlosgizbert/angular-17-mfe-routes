import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { LoadingModuleGuard } from './guards/loading-module.guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
})
export class AppComponent {
  loadingModuleService = inject(LoadingModuleGuard);
  router: Router = inject(Router);
}
