import { Card } from '../domain/card';
import { UpdateCardUseCase } from './update-card.use-case';
import { CardNotFoundError } from './card-not-found.error';
import { CardRepository } from './card.repository';

describe('UpdateCardUseCase', () => {
  it('updates an existing card and saves it', async () => {
    const existingCard = Card.rehydrate({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'Old question',
      answer: 'Old answer',
      category: 3,
      createdAt: new Date('2026-04-01T10:00:00.000Z'),
    });
    const save = jest.fn().mockResolvedValue(undefined);
    const repository: CardRepository = {
      save,
      findById: jest.fn().mockResolvedValue(existingCard),
      findByOwnerId: jest.fn(),
      deleteById: jest.fn(),
    };

    const useCase = new UpdateCardUseCase(repository);

    const result = await useCase.execute({
      cardId: 'card-1',
      question: 'Updated question',
      answer: 'Updated answer',
    });
    const savedCard = save.mock.calls[0][0];

    expect(repository.findById).toHaveBeenCalledWith('card-1');
    expect(save).toHaveBeenCalledTimes(1);
    expect(savedCard.toSnapshot()).toEqual({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'Updated question',
      answer: 'Updated answer',
      category: 3,
      createdAt: new Date('2026-04-01T10:00:00.000Z'),
      nextReviewAt: expect.any(Date),
      learned: false,
      tag: undefined,
    });
    expect(result).toEqual(savedCard.toSnapshot());
  });

  it('throws when trying to update a missing card', async () => {
    const repository: CardRepository = {
      save: jest.fn(),
      findById: jest.fn().mockResolvedValue(null),
      findByOwnerId: jest.fn(),
      deleteById: jest.fn(),
    };

    const useCase = new UpdateCardUseCase(repository);

    await expect(
      useCase.execute({
        cardId: 'missing-card',
        question: 'Updated question',
        answer: 'Updated answer',
      }),
    ).rejects.toThrow(new CardNotFoundError('missing-card'));
  });

  it('propagates validation errors and does not save invalid updates', async () => {
    const existingCard = Card.rehydrate({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'Old question',
      answer: 'Old answer',
      category: 2,
      createdAt: new Date('2026-04-01T10:00:00.000Z'),
    });
    const save = jest.fn().mockResolvedValue(undefined);
    const repository: CardRepository = {
      save,
      findById: jest.fn().mockResolvedValue(existingCard),
      findByOwnerId: jest.fn(),
      deleteById: jest.fn(),
    };

    const useCase = new UpdateCardUseCase(repository);

    await expect(
      useCase.execute({
        cardId: 'card-1',
        question: '   ',
        answer: 'Updated answer',
      }),
    ).rejects.toThrow('Card question is required.');

    expect(save).not.toHaveBeenCalled();
  });
});
