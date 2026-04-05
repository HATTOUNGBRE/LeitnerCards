import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CardsApiService } from '../../core/api/cards-api.service';
import { CardsPageComponent } from './cards-page.component';

describe('CardsPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsPageComponent],
      providers: [
        {
          provide: CardsApiService,
          useValue: {
            listByOwner: jest.fn().mockReturnValue(
              of([
                {
                  id: 'card-1',
                  ownerId: 'user-1',
                  question: 'What is SOLID?',
                  answer: 'Five design principles.',
                  category: 1,
                  createdAt: '2026-04-05T10:00:00.000Z',
                },
              ]),
            ),
            create: jest.fn().mockReturnValue(
              of({
                id: 'card-2',
                ownerId: 'user-1',
                question: 'New question',
                answer: 'New answer',
                category: 1,
                createdAt: '2026-04-05T12:00:00.000Z',
              }),
            ),
          },
        },
      ],
    }).compileComponents();
  });

  it('loads and displays cards on init', async () => {
    const fixture = TestBed.createComponent(CardsPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('What is SOLID?');
    expect(compiled.textContent).toContain('Five design principles.');
  });

  it('creates a card from the form submission', async () => {
    const fixture = TestBed.createComponent(CardsPageComponent);
    const apiService = TestBed.inject(CardsApiService);
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.componentInstance.createCardForm.setValue({
      question: 'New question',
      answer: 'New answer',
    });

    fixture.componentInstance.submit();
    await fixture.whenStable();

    expect(apiService.create).toHaveBeenCalledWith({
      ownerId: 'user-1',
      question: 'New question',
      answer: 'New answer',
    });
  });
});
