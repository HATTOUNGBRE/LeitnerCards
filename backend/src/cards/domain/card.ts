import { InvalidCardDataError } from './errors/invalid-card-data.error';

export const INITIAL_CARD_CATEGORY = 1;

export type CardCategory = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type CreateCardProps = {
  id: string;
  ownerId: string;
  question: string;
  answer: string;
  tag?: string;
  createdAt?: Date;
};

export type CardSnapshot = {
  id: string;
  ownerId: string;
  question: string;
  answer: string;
  tag?: string;
  category: CardCategory;
  createdAt: Date;
  nextReviewAt: Date;
  learned: boolean;
};

const REVIEW_INTERVALS: Record<CardCategory, number> = {
  1: 1,
  2: 2,
  3: 4,
  4: 8,
  5: 16,
  6: 32,
  7: 64,
};

export class Card {
  private constructor(private readonly snapshot: CardSnapshot) {}

  static create(props: CreateCardProps): Card {
    const id = Card.normalizeRequiredField(props.id, 'Card id is required.');
    const ownerId = Card.normalizeRequiredField(
      props.ownerId,
      'Card owner id is required.',
    );
    const question = Card.normalizeRequiredField(
      props.question,
      'Card question is required.',
    );
    const answer = Card.normalizeRequiredField(
      props.answer,
      'Card answer is required.',
    );
    const createdAt = props.createdAt ?? new Date();
    const tag = Card.normalizeOptionalField(props.tag);

    return new Card({
      id,
      ownerId,
      question,
      answer,
      tag,
      category: INITIAL_CARD_CATEGORY,
      createdAt,
      nextReviewAt: Card.startOfDay(createdAt),
      learned: false,
    });
  }

  static rehydrate(snapshot: CardSnapshot): Card {
    const id = Card.normalizeRequiredField(snapshot.id, 'Card id is required.');
    const ownerId = Card.normalizeRequiredField(
      snapshot.ownerId,
      'Card owner id is required.',
    );
    const question = Card.normalizeRequiredField(
      snapshot.question,
      'Card question is required.',
    );
    const answer = Card.normalizeRequiredField(
      snapshot.answer,
      'Card answer is required.',
    );

    if (!Card.isValidCategory(snapshot.category)) {
      throw new InvalidCardDataError('Card category must be between 1 and 7.');
    }

    return new Card({
      id,
      ownerId,
      question,
      answer,
      tag: Card.normalizeOptionalField(snapshot.tag),
      category: snapshot.category,
      createdAt: snapshot.createdAt,
      nextReviewAt: snapshot.nextReviewAt ?? Card.startOfDay(snapshot.createdAt),
      learned: snapshot.learned ?? false,
    });
  }

  get id(): string {
    return this.snapshot.id;
  }

  get ownerId(): string {
    return this.snapshot.ownerId;
  }

  get question(): string {
    return this.snapshot.question;
  }

  get answer(): string {
    return this.snapshot.answer;
  }

  get tag(): string | undefined {
    return this.snapshot.tag;
  }

  get category(): CardCategory {
    return this.snapshot.category;
  }

  get createdAt(): Date {
    return this.snapshot.createdAt;
  }

  get nextReviewAt(): Date {
    return this.snapshot.nextReviewAt;
  }

  get learned(): boolean {
    return this.snapshot.learned;
  }

  updateContent(props: { question: string; answer: string; tag?: string }): Card {
    const question = Card.normalizeRequiredField(
      props.question,
      'Card question is required.',
    );
    const answer = Card.normalizeRequiredField(
      props.answer,
      'Card answer is required.',
    );
    const tag = Card.normalizeOptionalField(props.tag ?? this.snapshot.tag);

    return new Card({
      ...this.snapshot,
      question,
      answer,
      tag,
    });
  }

  applyAnswer(isValid: boolean, referenceDate: Date = new Date()): Card {
    if (this.snapshot.learned) {
      return this;
    }

    const reviewDate = Card.startOfDay(referenceDate);

    if (!isValid) {
      return new Card({
        ...this.snapshot,
        category: INITIAL_CARD_CATEGORY,
        nextReviewAt: reviewDate,
        learned: false,
      });
    }

    const nextCategory =
      this.snapshot.category === 7
        ? 7
        : (this.snapshot.category + 1) as CardCategory;
    const learned = this.snapshot.category === 7;

    return new Card({
      ...this.snapshot,
      category: nextCategory,
      nextReviewAt: Card.getNextReviewDate(nextCategory, reviewDate),
      learned,
    });
  }

  isDueOn(referenceDate: Date): boolean {
    if (this.snapshot.learned) {
      return false;
    }

    return Card.isSameOrBeforeDay(
      this.snapshot.nextReviewAt,
      Card.startOfDay(referenceDate),
    );
  }

  toSnapshot(): CardSnapshot {
    return { ...this.snapshot };
  }

  private static isValidCategory(category: number): category is CardCategory {
    return Number.isInteger(category) && category >= 1 && category <= 7;
  }

  private static normalizeRequiredField(value: string, message: string): string {
    const normalizedValue = value?.trim();

    if (!normalizedValue) {
      throw new InvalidCardDataError(message);
    }

    return normalizedValue;
  }

  private static normalizeOptionalField(value?: string): string | undefined {
    const normalizedValue = value?.trim();
    return normalizedValue ? normalizedValue : undefined;
  }

  private static startOfDay(date: Date): Date {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  }

  private static getNextReviewDate(
    category: CardCategory,
    referenceDate: Date,
  ): Date {
    const interval = REVIEW_INTERVALS[category];
    const nextReviewDate = new Date(referenceDate);
    nextReviewDate.setUTCDate(nextReviewDate.getUTCDate() + interval);
    return Card.startOfDay(nextReviewDate);
  }

  private static isSameOrBeforeDay(value: Date, reference: Date): boolean {
    return value.getTime() <= reference.getTime();
  }
}
