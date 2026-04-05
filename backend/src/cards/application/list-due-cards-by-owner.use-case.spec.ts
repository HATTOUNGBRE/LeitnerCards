import { Card } from '../domain/card';
import { ListDueCardsByOwnerUseCase } from './list-due-cards-by-owner.use-case';
import { CardRepository } from './card.repository';

describe('ListDueCardsByOwnerUseCase', () => {
  it('returns only cards that are due for review', async () => {
    const dueCard = Card.rehydrate({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'Due question',
      answer: 'Due answer',
      category: 2,
      createdAt: new Date('2026-04-01T00:00:00.000Z'),
      nextReviewAt: new Date('2026-04-03T00:00:00.000Z'),
      learned: false,
    });
    const futureCard = Card.rehydrate({
      id: 'card-2',
      ownerId: 'user-1',
      question: 'Future question',
      answer: 'Future answer',
      category: 2,
      createdAt: new Date('2026-04-01T00:00:00.000Z'),
      nextReviewAt: new Date('2026-04-05T00:00:00.000Z'),
      learned: false,
    });

    const repository: CardRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByOwnerId: jest.fn().mockResolvedValue([dueCard, futureCard]),
      findByTags: jest.fn(),
      findAll: jest.fn(),
      deleteById: jest.fn(),
    };

    const useCase = new ListDueCardsByOwnerUseCase(repository);

    await expect(
      useCase.execute({
        ownerId: 'user-1',
        referenceDate: new Date('2026-04-04T00:00:00.000Z'),
      }),
    ).resolves.toEqual([dueCard.toSnapshot()]);
    expect(repository.findByOwnerId).toHaveBeenCalledWith('user-1');
  });

  it('returns an empty list when no cards are due', async () => {
    const repository: CardRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByOwnerId: jest.fn().mockResolvedValue([]),
      findByTags: jest.fn(),
      findAll: jest.fn(),
      deleteById: jest.fn(),
    };

    const useCase = new ListDueCardsByOwnerUseCase(repository);

    await expect(
      useCase.execute({ ownerId: 'user-1', referenceDate: new Date('2026-04-04T00:00:00.000Z') }),
    ).resolves.toEqual([]);
  });
});
