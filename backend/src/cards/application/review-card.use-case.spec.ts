import { Card } from '../domain/card';
import { ReviewCardUseCase } from './review-card.use-case';
import { CardRepository } from './card.repository';
import { CardNotFoundError } from './card-not-found.error';

describe('ReviewCardUseCase', () => {
  it('saves and returns the updated snapshot when the answer is valid', async () => {
    const card = Card.rehydrate({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'Question',
      answer: 'Answer',
      category: 1,
      createdAt: new Date('2026-04-01T00:00:00.000Z'),
      nextReviewAt: new Date('2026-04-01T00:00:00.000Z'),
      learned: false,
    });

    const save = jest.fn().mockResolvedValue(undefined);
    const repository: CardRepository = {
      save,
      findById: jest.fn().mockResolvedValue(card),
      findByOwnerId: jest.fn(),
      findByTags: jest.fn(),
      findAll: jest.fn(),
      deleteById: jest.fn(),
    };

    const useCase = new ReviewCardUseCase(repository);
    const result = await useCase.execute({
      cardId: 'card-1',
      isValid: true,
      referenceDate: new Date('2026-04-01T00:00:00.000Z'),
    });

    expect(save).toHaveBeenCalledTimes(1);
    expect(result.category).toBe(2);
    expect(result.learned).toBe(false);
  });

  it('resets review scheduling when the answer is invalid', async () => {
    const card = Card.rehydrate({
      id: 'card-2',
      ownerId: 'user-1',
      question: 'Another question',
      answer: 'Another answer',
      category: 3,
      createdAt: new Date('2026-04-01T00:00:00.000Z'),
      nextReviewAt: new Date('2026-04-05T00:00:00.000Z'),
      learned: false,
    });

    const save = jest.fn().mockResolvedValue(undefined);
    const repository: CardRepository = {
      save,
      findById: jest.fn().mockResolvedValue(card),
      findByOwnerId: jest.fn(),
      findByTags: jest.fn(),
      findAll: jest.fn(),
      deleteById: jest.fn(),
    };

    const useCase = new ReviewCardUseCase(repository);
    const result = await useCase.execute({
      cardId: 'card-2',
      isValid: false,
      referenceDate: new Date('2026-04-10T00:00:00.000Z'),
    });

    expect(save).toHaveBeenCalledTimes(1);
    expect(result.category).toBe(1);
    expect(result.nextReviewAt).toEqual(new Date('2026-04-10T00:00:00.000Z'));
  });

  it('throws when the card cannot be found', async () => {
    const repository: CardRepository = {
      save: jest.fn(),
      findById: jest.fn().mockResolvedValue(null),
      findByOwnerId: jest.fn(),
      findByTags: jest.fn(),
      findAll: jest.fn(),
      deleteById: jest.fn(),
    };

    const useCase = new ReviewCardUseCase(repository);

    await expect(
      useCase.execute({ cardId: 'missing-card', isValid: true }),
    ).rejects.toThrow(CardNotFoundError);
  });
});
