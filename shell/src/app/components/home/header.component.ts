import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent implements OnDestroy {
  protected router: Router = inject(Router);
  $subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.$subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

}
