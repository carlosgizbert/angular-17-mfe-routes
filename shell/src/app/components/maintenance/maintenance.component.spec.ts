import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaintenanceComponent } from './maintenance.component';

describe('MaintenanceComponent', () => {
  let component: MaintenanceComponent;
  let fixture: ComponentFixture<MaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('DEVE ser criado', () => expect(component).toBeTruthy());
});
