import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageNotFoundComponent } from './page-not-found.component';
import { findElByDataTestId } from '../../spec/find-elements.function';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNotFoundComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('DEVE ser criado', () => expect(component).toBeTruthy());

  describe('QUANDO o botão de voltar para o início for clicado', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      spy = spyOn(component.router, 'navigate');

      findElByDataTestId(fixture, 'button-back-to-home').nativeElement.click();
      fixture.detectChanges();
    })

    it('DEVE redirecionar para o início', () => {
      expect(spy).toHaveBeenCalledWith(['/']);
    });
  })
});
