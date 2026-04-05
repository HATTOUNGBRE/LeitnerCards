import { Card } from '../domain/card';
import { ListCardsByTagsUseCase } from './list-cards-by-tags.use-case';
import { CardRepository } from './card.repository';

describe('ListCardsByTagsUseCase', () => {
  it('returns cards that match requested tags', async () => {
    const mathCard = Card.rehydrate({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'Math question',
      answer: 'Math answer',
      category: 1,
      createdAt: new Date('2026-04-01T00:00:00.000Z'),
      tag: 'math',
    });
    const scienceCard = Card.rehydrate({
      id: 'card-2',
      ownerId: 'user-1',
      question: 'Science question',
      answer: 'Science answer',
      category: 1,
      createdAt: new Date('2026-04-01T00:00:00.000Z'),
      tag: 'science',
    });

    const repository: CardRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByOwnerId: jest.fn(),
      findByTags: jest.fn().mockResolvedValue([mathCard]),
      findAll: jest.fn(),
      deleteById: jest.fn(),
    };

    const useCase = new ListCardsByTagsUseCase(repository);

    await expect(useCase.execute({ tags: ['math'] })).resolves.toEqual([
      mathCard.toSnapshot(),
    ]);
    expect(repository.findByTags).toHaveBeenCalledWith(['math']);
  });

  it('returns an empty list when no cards match', async () => {
    const repository: CardRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByOwnerId: jest.fn(),
      findByTags: jest.fn().mockResolvedValue([]),
      findAll: jest.fn(),
      deleteById: jest.fn(),
    };

    const useCase = new ListCardsByTagsUseCase(repository);

    await expect(useCase.execute({ tags: ['history'] })).resolves.toEqual([]);
  });
});
