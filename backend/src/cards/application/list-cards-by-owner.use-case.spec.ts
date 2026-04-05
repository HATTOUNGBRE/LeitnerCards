import { Card } from '../domain/card';
import { ListCardsByOwnerUseCase } from './list-cards-by-owner.use-case';
import { CardRepository } from './card.repository';

describe('ListCardsByOwnerUseCase', () => {
  it('returns all cards belonging to the requested owner', async () => {
    const firstCard = Card.rehydrate({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'Question 1',
      answer: 'Answer 1',
      category: 1,
      createdAt: new Date('2026-04-01T10:00:00.000Z'),
      nextReviewAt: new Date('2026-04-01T00:00:00.000Z'),
      learned: false,
    });
    const secondCard = Card.rehydrate({
      id: 'card-2',
      ownerId: 'user-1',
      question: 'Question 2',
      answer: 'Answer 2',
      category: 3,
      createdAt: new Date('2026-04-02T10:00:00.000Z'),
      nextReviewAt: new Date('2026-04-02T00:00:00.000Z'),
      learned: false,
    });
    const repository: CardRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByOwnerId: jest.fn().mockResolvedValue([firstCard, secondCard]),
      deleteById: jest.fn(),
    };

    const useCase = new ListCardsByOwnerUseCase(repository);

    await expect(useCase.execute('user-1')).resolves.toEqual([
      firstCard.toSnapshot(),
      secondCard.toSnapshot(),
    ]);
    expect(repository.findByOwnerId).toHaveBeenCalledWith('user-1');
  });

  it('returns an empty list when the owner has no cards', async () => {
    const repository: CardRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByOwnerId: jest.fn().mockResolvedValue([]),
      deleteById: jest.fn(),
    };

    const useCase = new ListCardsByOwnerUseCase(repository);

    await expect(useCase.execute('user-2')).resolves.toEqual([]);
  });
});
