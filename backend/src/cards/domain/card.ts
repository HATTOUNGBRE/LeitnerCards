import { InvalidCardDataError } from './errors/invalid-card-data.error';

export const INITIAL_CARD_CATEGORY = 1;

export type CardCategory = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type CreateCardProps = {
  id: string;
  ownerId: string;
  question: string;
  answer: string;
  createdAt?: Date;
};

export type CardSnapshot = {
  id: string;
  ownerId: string;
  question: string;
  answer: string;
  category: CardCategory;
  createdAt: Date;
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

    return new Card({
      id,
      ownerId,
      question,
      answer,
      category: INITIAL_CARD_CATEGORY,
      createdAt: props.createdAt ?? new Date(),
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
      category: snapshot.category,
      createdAt: snapshot.createdAt,
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

  get category(): CardCategory {
    return this.snapshot.category;
  }

  get createdAt(): Date {
    return this.snapshot.createdAt;
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
}
