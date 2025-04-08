import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function findElByDataTestId(fixture: ComponentFixture<unknown>, id: string) {
  return fixture.debugElement.query(By.css(`[data-testid="${id}"]`));
}
