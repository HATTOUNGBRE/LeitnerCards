import { CardIdGenerator } from './card-id-generator.port';
import { CreateCardUseCase } from './create-card.use-case';
import { CardRepository } from './card.repository';

describe('CreateCardUseCase', () => {
  it('creates a card, saves it, and returns its snapshot', async () => {
    const save = jest.fn().mockResolvedValue(undefined);
    const repository: CardRepository = {
      save,
      findById: jest.fn(),
      findByOwnerId: jest.fn(),
      deleteById: jest.fn(),
    };
    const idGenerator: CardIdGenerator = {
      next: jest.fn().mockReturnValue('card-123'),
    };

    const useCase = new CreateCardUseCase(repository, idGenerator);

    const result = await useCase.execute({
      ownerId: 'user-1',
      question: 'What is clean architecture?',
      answer: 'A layered architecture with boundaries.',
    });
    const savedCard = save.mock.calls[0][0];

    expect(idGenerator.next).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledTimes(1);
    expect(savedCard.toSnapshot()).toEqual({
      id: 'card-123',
      ownerId: 'user-1',
      question: 'What is clean architecture?',
      answer: 'A layered architecture with boundaries.',
      category: 1,
      createdAt: expect.any(Date),
    });
    expect(result).toEqual({
      id: 'card-123',
      ownerId: 'user-1',
      question: 'What is clean architecture?',
      answer: 'A layered architecture with boundaries.',
      category: 1,
      createdAt: expect.any(Date),
    });
  });

  it('propagates domain validation errors and does not save invalid cards', async () => {
    const save = jest.fn().mockResolvedValue(undefined);
    const repository: CardRepository = {
      save,
      findById: jest.fn(),
      findByOwnerId: jest.fn(),
      deleteById: jest.fn(),
    };
    const idGenerator: CardIdGenerator = {
      next: jest.fn().mockReturnValue('card-123'),
    };

    const useCase = new CreateCardUseCase(repository, idGenerator);

    await expect(
      useCase.execute({
        ownerId: 'user-1',
        question: '   ',
        answer: 'Valid answer',
      }),
    ).rejects.toThrow('Card question is required.');

    expect(save).not.toHaveBeenCalled();
  });
});
