import { Card } from '../domain/card';
import { GetCardByIdUseCase } from './get-card-by-id.use-case';
import { CardNotFoundError } from './card-not-found.error';
import { CardRepository } from './card.repository';

describe('GetCardByIdUseCase', () => {
  it('returns the requested card snapshot', async () => {
    const card = Card.rehydrate({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'What is TDD?',
      answer: 'Test-Driven Development.',
      category: 2,
      createdAt: new Date('2026-04-05T10:00:00.000Z'),
    });
    const repository: CardRepository = {
      save: jest.fn(),
      findById: jest.fn().mockResolvedValue(card),
      findByOwnerId: jest.fn(),
      deleteById: jest.fn(),
    };

    const useCase = new GetCardByIdUseCase(repository);

    await expect(useCase.execute('card-1')).resolves.toEqual(card.toSnapshot());
    expect(repository.findById).toHaveBeenCalledWith('card-1');
  });

  it('throws when the card does not exist', async () => {
    const repository: CardRepository = {
      save: jest.fn(),
      findById: jest.fn().mockResolvedValue(null),
      findByOwnerId: jest.fn(),
      deleteById: jest.fn(),
    };

    const useCase = new GetCardByIdUseCase(repository);

    await expect(useCase.execute('missing-card')).rejects.toThrow(
      new CardNotFoundError('missing-card'),
    );
  });
});
