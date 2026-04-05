import { Card, INITIAL_CARD_CATEGORY } from './card';
import { InvalidCardDataError } from './errors/invalid-card-data.error';

describe('Card', () => {
  it('creates a card with category 1 by default', () => {
    const createdAt = new Date('2026-04-05T10:00:00.000Z');

    const card = Card.create({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'What is SOLID?',
      answer: 'Five object-oriented design principles.',
      createdAt,
    });

    expect(card.toSnapshot()).toEqual({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'What is SOLID?',
      answer: 'Five object-oriented design principles.',
      tag: undefined,
      category: INITIAL_CARD_CATEGORY,
      createdAt,
      nextReviewAt: expect.any(Date),
      learned: false,
    });
  });

  it('trims text fields during creation', () => {
    const card = Card.create({
      id: '  card-1  ',
      ownerId: '  user-1  ',
      question: '  What is DDD?  ',
      answer: '  Domain-Driven Design.  ',
    });

    expect(card.id).toBe('card-1');
    expect(card.ownerId).toBe('user-1');
    expect(card.question).toBe('What is DDD?');
    expect(card.answer).toBe('Domain-Driven Design.');
  });

  it('rehydrates an existing card with its persisted category', () => {
    const createdAt = new Date('2026-04-01T10:00:00.000Z');

    const card = Card.rehydrate({
      id: 'card-42',
      ownerId: 'user-1',
      question: 'What is hexagonal architecture?',
      answer: 'An architecture based on ports and adapters.',
      category: 4,
      createdAt,
    });

    expect(card.toSnapshot()).toEqual({
      id: 'card-42',
      ownerId: 'user-1',
      question: 'What is hexagonal architecture?',
      answer: 'An architecture based on ports and adapters.',
      tag: undefined,
      category: 4,
      createdAt,
      nextReviewAt: expect.any(Date),
      learned: false,
    });
  });

  it('rejects an invalid category during rehydration', () => {
    expect(() =>
      Card.rehydrate({
        id: 'card-1',
        ownerId: 'user-1',
        question: 'Question',
        answer: 'Answer',
        category: 8 as never,
        createdAt: new Date('2026-04-05T10:00:00.000Z'),
        nextReviewAt: new Date('2026-04-05T00:00:00.000Z'),
        learned: false,
      }),
    ).toThrow(new InvalidCardDataError('Card category must be between 1 and 7.'));
  });

  it('stores the tag when provided', () => {
    const card = Card.create({
      id: 'card-3',
      ownerId: 'user-1',
      question: 'What is TDD?',
      answer: 'Test-Driven Development.',
      tag: 'Development',
    });

    expect(card.tag).toBe('Development');
    expect(card.toSnapshot().tag).toBe('Development');
  });

  it('moves card back to category 1 after incorrect answer', () => {
    const card = Card.create({
      id: 'card-4',
      ownerId: 'user-1',
      question: 'What is a tag?',
      answer: 'A keyword for grouping cards.',
      createdAt: new Date('2026-04-01T10:00:00.000Z'),
    });

    const updatedCard = card.applyAnswer(false, new Date('2026-04-02T10:00:00.000Z'));

    expect(updatedCard.category).toBe(INITIAL_CARD_CATEGORY);
    expect(updatedCard.nextReviewAt.toISOString()).toBe('2026-04-02T00:00:00.000Z');
  });

  it('increments category and schedules next review after correct answer', () => {
    const card = Card.create({
      id: 'card-5',
      ownerId: 'user-1',
      question: 'What is SOLID?',
      answer: 'Five object-oriented design principles.',
      createdAt: new Date('2026-04-01T10:00:00.000Z'),
    });

    const updatedCard = card.applyAnswer(true, new Date('2026-04-01T10:00:00.000Z'));

    expect(updatedCard.category).toBe(2);
    expect(updatedCard.nextReviewAt.toISOString()).toBe('2026-04-03T00:00:00.000Z');
  });

  it('identifies a card as due on its review date', () => {
    const card = Card.create({
      id: 'card-6',
      ownerId: 'user-1',
      question: 'What is DDD?',
      answer: 'Domain-Driven Design.',
      createdAt: new Date('2026-04-01T10:00:00.000Z'),
    });

    expect(card.isDueOn(new Date('2026-04-01T12:00:00.000Z'))).toBe(true);
  });

  it.each([
    {
      label: 'id',
      payload: {
        id: '   ',
        ownerId: 'user-1',
        question: 'Question',
        answer: 'Answer',
      },
      errorMessage: 'Card id is required.',
    },
    {
      label: 'ownerId',
      payload: {
        id: 'card-1',
        ownerId: '   ',
        question: 'Question',
        answer: 'Answer',
      },
      errorMessage: 'Card owner id is required.',
    },
    {
      label: 'question',
      payload: {
        id: 'card-1',
        ownerId: 'user-1',
        question: '   ',
        answer: 'Answer',
      },
      errorMessage: 'Card question is required.',
    },
    {
      label: 'answer',
      payload: {
        id: 'card-1',
        ownerId: 'user-1',
        question: 'Question',
        answer: '   ',
      },
      errorMessage: 'Card answer is required.',
    },
  ])('rejects an invalid $label', ({ payload, errorMessage }) => {
    expect(() => Card.create(payload)).toThrow(
      new InvalidCardDataError(errorMessage),
    );
  });
});
