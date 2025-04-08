import { BreadcrumbComponent } from '@/app/components/breadcrumb/breadcrumb.component';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sub-roxo',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './sub-roxo.component.html',
  styleUrl: './sub-roxo.component.scss',
})
export class PageSubRoxoComponent {
  protected router: Router = inject(Router);

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
