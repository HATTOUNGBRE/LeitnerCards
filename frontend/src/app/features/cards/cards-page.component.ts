import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { CardsApiService, CardViewModel } from '../../core/api/cards-api.service';

@Component({
  selector: 'app-cards-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cards-page.component.html',
  styleUrl: './cards-page.component.scss',
})
export class CardsPageComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly cardsApiService = inject(CardsApiService);

  readonly ownerId = 'user-1';
  readonly cards = signal<CardViewModel[]>([]);
  readonly selectedCard = signal<CardViewModel | null>(null);
  readonly isLoading = signal(true);
  readonly isSubmitting = signal(false);
  readonly isUpdating = signal(false);
  readonly isDeleting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly detailErrorMessage = signal<string | null>(null);

  readonly createCardForm = this.formBuilder.nonNullable.group({
    question: ['', [Validators.required]],
    answer: ['', [Validators.required]],
  });

  readonly editCardForm = this.formBuilder.nonNullable.group({
    question: ['', [Validators.required]],
    answer: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.loadCards();
  }

  submit(): void {
    if (this.createCardForm.invalid) {
      this.createCardForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    this.cardsApiService
      .create({
        ownerId: this.ownerId,
        question: this.createCardForm.getRawValue().question,
        answer: this.createCardForm.getRawValue().answer,
      })
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: (card) => {
          this.cards.update((cards) => [card, ...cards]);
          this.selectCard(card.id);
          this.createCardForm.reset();
        },
        error: () => {
          this.errorMessage.set('Unable to create the card right now.');
        },
      });
  }

  private loadCards(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

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

  selectCard(cardId: string): void {
    this.detailErrorMessage.set(null);

    this.cardsApiService.findById(cardId).subscribe({
      next: (card) => {
        this.selectedCard.set(card);
        this.editCardForm.setValue({
          question: card.question,
          answer: card.answer,
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
      this.editCardForm.markAllAsTouched();
      return;
    }

    this.isUpdating.set(true);
    this.detailErrorMessage.set(null);

    this.cardsApiService
      .update(selectedCard.id, this.editCardForm.getRawValue())
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
          this.editCardForm.reset();
        },
        error: () => {
          this.detailErrorMessage.set('Unable to delete this card.');
        },
      });
  }
}
