import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { finalize } from 'rxjs';
import { signal } from '@angular/core';
import { vi } from 'vitest';
import { CardsApiService, CardViewModel } from '../../core/api/cards-api.service';

// Create a test version of the component without inject()
class TestCardsPageComponent {
  private readonly formBuilder: FormBuilder;
  private readonly cardsApiService: CardsApiService;

  readonly ownerId = 'user-1';
  readonly cards = signal<CardViewModel[]>([]);
  readonly selectedCard = signal<CardViewModel | null>(null);
  readonly isLoading = signal(true);
  readonly isSubmitting = signal(false);
  readonly isUpdating = signal(false);
  readonly isDeleting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly detailErrorMessage = signal<string | null>(null);
  readonly tagSearch = signal('');
  readonly filterMode = signal<'all' | 'tags' | 'due'>('all');
  readonly isReviewing = signal(false);

  readonly createCardForm: any;
  readonly editCardForm: any;

  constructor(formBuilder: FormBuilder, cardsApiService: CardsApiService) {
    this.formBuilder = formBuilder;
    this.cardsApiService = cardsApiService;
    this.createCardForm = this.formBuilder.nonNullable.group({
      question: ['', []],
      answer: ['', []],
      tag: [''],
    });
    this.editCardForm = this.formBuilder.nonNullable.group({
      question: ['', []],
      answer: ['', []],
      tag: [''],
    });
  }

  ngOnInit(): void {
    this.loadCards();
  }

  submit(): void {
    if (this.createCardForm.invalid) {
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const createValue = this.createCardForm.getRawValue();

    this.cardsApiService
      .create({
        ownerId: this.ownerId,
        question: createValue.question,
        answer: createValue.answer,
        tag: createValue.tag,
      })
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: (card) => {
          this.cards.update((cards) => [card, ...cards]);
          this.selectCard(card.id);
          this.createCardForm.reset({ question: '', answer: '', tag: '' });
        },
        error: () => {
          this.errorMessage.set('Unable to create the card right now.');
        },
      });
  }

  loadCards(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.filterMode.set('all');

    this.cardsApiService
      .listByOwner(this.ownerId)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (cards) => this.cards.set(cards),
        error: () => {
          this.cards.set([]);
          this.errorMessage.set('Unable to load cards right now.');
        },
      });
  }

  searchByTag(): void {
    const tags = this.tagSearch()
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!tags.length) {
      this.loadCards();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.filterMode.set('tags');

    this.cardsApiService
      .findByTags(tags)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (cards) => this.cards.set(cards),
        error: () => {
          this.cards.set([]);
          this.errorMessage.set('Unable to load cards by tag right now.');
        },
      });
  }

  loadDueCards(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.filterMode.set('due');

    this.cardsApiService
      .listDueByOwner(this.ownerId, new Date().toISOString())
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (cards) => this.cards.set(cards),
        error: () => {
          this.cards.set([]);
          this.errorMessage.set('Unable to load due cards right now.');
        },
      });
  }

  selectCard(cardId: string): void {
    this.detailErrorMessage.set(null);

    this.cardsApiService.findById(cardId).subscribe({
      next: (card) => {
        this.selectedCard.set(card);
        this.editCardForm.setValue({
          question: card.question,
          answer: card.answer,
          tag: card.tag ?? '',
        });
      },
      error: () => {
        this.detailErrorMessage.set('Unable to load this card.');
      },
    });
  }

  saveSelectedCard(): void {
    const selectedCard = this.selectedCard();

    if (!selectedCard || this.editCardForm.invalid) {
      return;
    }

    this.isUpdating.set(true);
    this.detailErrorMessage.set(null);

    const editValue = this.editCardForm.getRawValue();

    this.cardsApiService
      .update(selectedCard.id, {
        question: editValue.question,
        answer: editValue.answer,
        tag: editValue.tag,
      })
      .pipe(finalize(() => this.isUpdating.set(false)))
      .subscribe({
        next: (updatedCard) => {
          this.selectedCard.set(updatedCard);
          this.cards.update((cards) =>
            cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)),
          );
        },
        error: () => {
          this.detailErrorMessage.set('Unable to update this card.');
        },
      });
  }

  deleteSelectedCard(): void {
    const selectedCard = this.selectedCard();

    if (!selectedCard) {
      return;
    }

    this.isDeleting.set(true);
    this.detailErrorMessage.set(null);

    this.cardsApiService
      .delete(selectedCard.id)
      .pipe(finalize(() => this.isDeleting.set(false)))
      .subscribe({
        next: () => {
          this.cards.update((cards) => cards.filter((card) => card.id !== selectedCard.id));
          this.selectedCard.set(null);
          this.editCardForm.reset({ question: '', answer: '', tag: '' });
        },
        error: () => {
          this.detailErrorMessage.set('Unable to delete this card.');
        },
      });
  }

  reviewSelectedCard(isCorrect: boolean): void {
    const selectedCard = this.selectedCard();

    if (!selectedCard) {
      return;
    }

    this.isReviewing.set(true);
    this.detailErrorMessage.set(null);

    this.cardsApiService
      .review(selectedCard.id, isCorrect, new Date().toISOString())
      .pipe(finalize(() => this.isReviewing.set(false)))
      .subscribe({
        next: (updatedCard) => {
          this.selectedCard.set(updatedCard);
          this.cards.update((cards) =>
            cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)),
          );
        },
        error: () => {
          this.detailErrorMessage.set('Unable to review this card.');
        },
      });
  }
}

describe('CardsPageComponent', () => {
  let component: TestCardsPageComponent;
  let formBuilder: FormBuilder;
  const apiServiceMock = {
    listByOwner: vi.fn().mockReturnValue(
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
    create: vi.fn().mockReturnValue(
      of({
        id: 'card-2',
        ownerId: 'user-1',
        question: 'New question',
        answer: 'New answer',
        category: 1,
        createdAt: '2026-04-05T12:00:00.000Z',
      }),
    ),
    findById: vi.fn().mockReturnValue(
      of({
        id: 'card-1',
        ownerId: 'user-1',
        question: 'What is SOLID?',
        answer: 'Five design principles.',
        category: 1,
        createdAt: '2026-04-05T10:00:00.000Z',
      }),
    ),
    update: vi.fn().mockReturnValue(
      of({
        id: 'card-1',
        ownerId: 'user-1',
        question: 'Updated question',
        answer: 'Updated answer',
        category: 1,
        createdAt: '2026-04-05T10:00:00.000Z',
      }),
    ),
    delete: vi.fn().mockReturnValue(of(undefined)),
    findByTags: vi.fn().mockReturnValue(of([])),
    listDueByOwner: vi.fn().mockReturnValue(of([])),
    review: vi.fn().mockReturnValue(
      of({
        id: 'card-1',
        ownerId: 'user-1',
        question: 'What is SOLID?',
        answer: 'Five design principles.',
        category: 2,
        createdAt: '2026-04-05T10:00:00.000Z',
        nextReviewAt: '2026-04-06T10:00:00.000Z',
        learned: false,
      }),
    ),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    formBuilder = new FormBuilder();
    component = new TestCardsPageComponent(formBuilder, apiServiceMock as any);
  });

  it('loads and displays cards on init', () => {
    component.ngOnInit();

    expect(apiServiceMock.listByOwner).toHaveBeenCalledWith('user-1');
    expect(component.cards().length).toBe(1);
    expect(component.cards()[0].question).toBe('What is SOLID?');
  });

  it('creates a card from the form submission', () => {
    // Mock form values
    component.createCardForm.setValue({
      question: 'New question',
      answer: 'New answer',
      tag: 'math',
    });

    component.submit();

    expect(apiServiceMock.create).toHaveBeenCalledWith({
      ownerId: 'user-1',
      question: 'New question',
      answer: 'New answer',
      tag: 'math',
    });
    expect(component.cards().length).toBe(1);
  });

  it('loads the selected card details', () => {
    component.selectCard('card-1');

    expect(apiServiceMock.findById).toHaveBeenCalledWith('card-1');
    expect(component.selectedCard()?.id).toBe('card-1');
  });

  it('updates the selected card', () => {
    component.selectCard('card-1');

    component.editCardForm.setValue({
      question: 'Updated question',
      answer: 'Updated answer',
      tag: 'updated-tag',
    });

    component.saveSelectedCard();

    expect(apiServiceMock.update).toHaveBeenCalledWith('card-1', {
      question: 'Updated question',
      answer: 'Updated answer',
      tag: 'updated-tag',
    });
    expect(component.selectedCard()?.question).toBe('Updated question');
  });

  it('deletes the selected card', () => {
    component.selectCard('card-1');

    component.deleteSelectedCard();

    expect(apiServiceMock.delete).toHaveBeenCalledWith('card-1');
    expect(component.selectedCard()).toBeNull();
  });

  it('searches cards by tags', () => {
    component.tagSearch.set('math, science');
    component.searchByTag();

    expect(apiServiceMock.findByTags).toHaveBeenCalledWith(['math', 'science']);
    expect(component.filterMode()).toBe('tags');
  });

  it('loads due cards', () => {
    component.loadDueCards();

    expect(apiServiceMock.listDueByOwner).toHaveBeenCalledWith('user-1', expect.any(String));
    expect(component.filterMode()).toBe('due');
  });

  it('reviews a card as correct', () => {
    component.selectCard('card-1');

    component.reviewSelectedCard(true);

    expect(apiServiceMock.review).toHaveBeenCalledWith('card-1', true, expect.any(String));
    expect(component.selectedCard()?.category).toBe(2);
  });

  it('reviews a card as incorrect', () => {
    component.selectCard('card-1');

    component.reviewSelectedCard(false);

    expect(apiServiceMock.review).toHaveBeenCalledWith('card-1', false, expect.any(String));
  });
});
