import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CardsApiService } from '../../core/api/cards-api.service';
import { CardsPageComponent } from './cards-page.component';

describe('CardsPageComponent', () => {
  const apiServiceMock = {
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
    findById: jest.fn().mockReturnValue(
      of({
        id: 'card-1',
        ownerId: 'user-1',
        question: 'What is SOLID?',
        answer: 'Five design principles.',
        category: 1,
        createdAt: '2026-04-05T10:00:00.000Z',
      }),
    ),
    update: jest.fn().mockReturnValue(
      of({
        id: 'card-1',
        ownerId: 'user-1',
        question: 'Updated question',
        answer: 'Updated answer',
        category: 1,
        createdAt: '2026-04-05T10:00:00.000Z',
      }),
    ),
    delete: jest.fn().mockReturnValue(of(undefined)),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [CardsPageComponent],
      providers: [
        {
          provide: CardsApiService,
          useValue: apiServiceMock,
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

  it('loads the selected card details', async () => {
    const fixture = TestBed.createComponent(CardsPageComponent);
    const apiService = TestBed.inject(CardsApiService);
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.componentInstance.selectCard('card-1');
    await fixture.whenStable();

    expect(apiService.findById).toHaveBeenCalledWith('card-1');
    expect(fixture.componentInstance.selectedCard()?.id).toBe('card-1');
    expect(fixture.componentInstance.editCardForm.getRawValue()).toEqual({
      question: 'What is SOLID?',
      answer: 'Five design principles.',
    });
  });

  it('updates the selected card', async () => {
    const fixture = TestBed.createComponent(CardsPageComponent);
    const apiService = TestBed.inject(CardsApiService);
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.componentInstance.selectCard('card-1');
    await fixture.whenStable();
    fixture.componentInstance.editCardForm.setValue({
      question: 'Updated question',
      answer: 'Updated answer',
    });

    fixture.componentInstance.saveSelectedCard();
    await fixture.whenStable();

    expect(apiService.update).toHaveBeenCalledWith('card-1', {
      question: 'Updated question',
      answer: 'Updated answer',
    });
    expect(fixture.componentInstance.selectedCard()?.question).toBe('Updated question');
  });

  it('deletes the selected card', async () => {
    const fixture = TestBed.createComponent(CardsPageComponent);
    const apiService = TestBed.inject(CardsApiService);
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.componentInstance.selectCard('card-1');
    await fixture.whenStable();
    fixture.componentInstance.deleteSelectedCard();
    await fixture.whenStable();

    expect(apiService.delete).toHaveBeenCalledWith('card-1');
    expect(fixture.componentInstance.selectedCard()).toBeNull();
  });
});
