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
  readonly isLoading = signal(true);
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly createCardForm = this.formBuilder.nonNullable.group({
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
}
