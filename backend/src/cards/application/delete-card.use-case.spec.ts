import { DeleteCardUseCase } from './delete-card.use-case';
import { CardNotFoundError } from './card-not-found.error';
import { Card } from '../domain/card';
import { CardRepository } from './card.repository';

describe('DeleteCardUseCase', () => {
  it('deletes an existing card', async () => {
    const card = Card.rehydrate({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'Question',
      answer: 'Answer',
      category: 1,
      createdAt: new Date('2026-04-01T10:00:00.000Z'),
      nextReviewAt: new Date('2026-04-01T00:00:00.000Z'),
      learned: false,
    });
    const deleteById = jest.fn().mockResolvedValue(undefined);
    const repository: CardRepository = {
      save: jest.fn(),
      findById: jest.fn().mockResolvedValue(card),
      findByOwnerId: jest.fn(),
      deleteById,
    };

    const useCase = new DeleteCardUseCase(repository);

    await expect(useCase.execute('card-1')).resolves.toBeUndefined();
    expect(repository.findById).toHaveBeenCalledWith('card-1');
    expect(deleteById).toHaveBeenCalledWith('card-1');
  });

  it('throws when trying to delete a missing card', async () => {
    const repository: CardRepository = {
      save: jest.fn(),
      findById: jest.fn().mockResolvedValue(null),
      findByOwnerId: jest.fn(),
      deleteById: jest.fn(),
    };

    const useCase = new DeleteCardUseCase(repository);

    await expect(useCase.execute('missing-card')).rejects.toThrow(
      new CardNotFoundError('missing-card'),
    );
  });
});
