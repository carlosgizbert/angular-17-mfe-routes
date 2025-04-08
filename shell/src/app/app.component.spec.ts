import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MockComponent } from 'ng-mocks';
import { AppComponent } from './app.component';
import { RemoteComponentComponent } from '@/components/remote-component/remote-component.component';
import { LoadingModuleGuard } from '@/guards/loading-module.guard';

describe('AppComponent', () => {
  let windowMock: jasmine.SpyObj<Window>;
  let fixture;
  let component: AppComponent;

  beforeEach(async () => {
    windowMock = jasmine.createSpyObj('Window', [
      'addEventListener',
      'removeEventListener',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MockComponent(RemoteComponentComponent),
        HttpClientModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: LoadingModuleGuard, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('DEVE instanciar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('DEVE registrar o listener de logout ao criar o componente', () => {
    expect(windowMock.addEventListener).toHaveBeenCalledWith(
      'logout',
      jasmine.any(Function)
    );
    expect(windowMock.addEventListener).toHaveBeenCalledWith(
      'logout-by-expired-token',
      jasmine.any(Function)
    );
  });
});
