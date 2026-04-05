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
      category: INITIAL_CARD_CATEGORY,
      createdAt,
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
