import { BreadcrumbComponent } from '@/app/components/breadcrumb/breadcrumb.component';
import { SharedDataService } from '@/app/services/shared-data/shared-data.service';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, BreadcrumbComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class PageHomeComponent {
  private readonly sharedDataService: SharedDataService = inject(SharedDataService);
  sharedData$ = this.sharedDataService.sharedData$;
}
