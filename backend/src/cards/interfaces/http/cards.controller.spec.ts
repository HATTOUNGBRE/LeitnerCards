import { CardsController } from './cards.controller';
import { CreateCardUseCase } from '../../application/create-card.use-case';
import { GetCardByIdUseCase } from '../../application/get-card-by-id.use-case';
import { ListCardsByOwnerUseCase } from '../../application/list-cards-by-owner.use-case';
import { ListCardsByTagsUseCase } from '../../application/list-cards-by-tags.use-case';
import { ListDueCardsByOwnerUseCase } from '../../application/list-due-cards-by-owner.use-case';
import { ReviewCardUseCase } from '../../application/review-card.use-case';
import { UpdateCardUseCase } from '../../application/update-card.use-case';
import { DeleteCardUseCase } from '../../application/delete-card.use-case';

describe('CardsController', () => {
  const createCardUseCase = {
    execute: jest.fn(),
  } as unknown as CreateCardUseCase;
  const getCardByIdUseCase = {
    execute: jest.fn(),
  } as unknown as GetCardByIdUseCase;
  const listCardsByOwnerUseCase = {
    execute: jest.fn(),
  } as unknown as ListCardsByOwnerUseCase;
  const listCardsByTagsUseCase = {
    execute: jest.fn(),
  } as unknown as ListCardsByTagsUseCase;
  const listDueCardsByOwnerUseCase = {
    execute: jest.fn(),
  } as unknown as ListDueCardsByOwnerUseCase;
  const reviewCardUseCase = {
    execute: jest.fn(),
  } as unknown as ReviewCardUseCase;
  const updateCardUseCase = {
    execute: jest.fn(),
  } as unknown as UpdateCardUseCase;
  const deleteCardUseCase = {
    execute: jest.fn(),
  } as unknown as DeleteCardUseCase;

  const controller = new CardsController(
    createCardUseCase,
    getCardByIdUseCase,
    listCardsByOwnerUseCase,
    listCardsByTagsUseCase,
    listDueCardsByOwnerUseCase,
    reviewCardUseCase,
    updateCardUseCase,
    deleteCardUseCase,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('delegates card creation to the use case', async () => {
    (createCardUseCase.execute as jest.Mock).mockResolvedValue({ id: 'card-1' });

    await expect(
      controller.create({
        ownerId: 'user-1',
        question: 'Question',
        answer: 'Answer',
      }),
    ).resolves.toEqual({ id: 'card-1' });

    expect(createCardUseCase.execute).toHaveBeenCalledWith({
      ownerId: 'user-1',
      question: 'Question',
      answer: 'Answer',
    });
  });

  it('delegates card listing to the use case', async () => {
    (listCardsByOwnerUseCase.execute as jest.Mock).mockResolvedValue([{ id: 'card-1' }]);

    await expect(controller.findByOwner('user-1')).resolves.toEqual([{ id: 'card-1' }]);
    expect(listCardsByOwnerUseCase.execute).toHaveBeenCalledWith('user-1');
  });

  it('delegates card retrieval by id to the use case', async () => {
    (getCardByIdUseCase.execute as jest.Mock).mockResolvedValue({ id: 'card-1' });

    await expect(controller.findById('card-1')).resolves.toEqual({ id: 'card-1' });
    expect(getCardByIdUseCase.execute).toHaveBeenCalledWith('card-1');
  });

  it('delegates card update to the use case', async () => {
    (updateCardUseCase.execute as jest.Mock).mockResolvedValue({ id: 'card-1' });

    await expect(
      controller.update('card-1', {
        question: 'Updated question',
        answer: 'Updated answer',
      }),
    ).resolves.toEqual({ id: 'card-1' });

    expect(updateCardUseCase.execute).toHaveBeenCalledWith({
      cardId: 'card-1',
      question: 'Updated question',
      answer: 'Updated answer',
      tag: undefined,
    });
  });

  it('delegates card tag search to the use case', async () => {
    (listCardsByTagsUseCase.execute as jest.Mock).mockResolvedValue([{ id: 'card-1' }]);

    await expect(controller.findByTags('math,science')).resolves.toEqual([
      { id: 'card-1' },
    ]);

    expect(listCardsByTagsUseCase.execute).toHaveBeenCalledWith({
      tags: ['math', 'science'],
    });
  });

  it('delegates due card retrieval to the use case', async () => {
    (listDueCardsByOwnerUseCase.execute as jest.Mock).mockResolvedValue([
      { id: 'card-1' },
    ]);

    await expect(
      controller.findDueByOwner('user-1', '2026-04-04T00:00:00.000Z'),
    ).resolves.toEqual([{ id: 'card-1' }]);

    expect(listDueCardsByOwnerUseCase.execute).toHaveBeenCalledWith({
      ownerId: 'user-1',
      referenceDate: new Date('2026-04-04T00:00:00.000Z'),
    });
  });

  it('delegates card review to the use case', async () => {
    (reviewCardUseCase.execute as jest.Mock).mockResolvedValue({ id: 'card-1' });

    await expect(
      controller.review('card-1', {
        isValid: true,
        referenceDate: '2026-04-04T00:00:00.000Z',
      }),
    ).resolves.toEqual({ id: 'card-1' });

    expect(reviewCardUseCase.execute).toHaveBeenCalledWith({
      cardId: 'card-1',
      isValid: true,
      referenceDate: new Date('2026-04-04T00:00:00.000Z'),
    });
  });

  it('delegates card deletion to the use case', async () => {
    (deleteCardUseCase.execute as jest.Mock).mockResolvedValue(undefined);

    await expect(controller.remove('card-1')).resolves.toBeUndefined();
    expect(deleteCardUseCase.execute).toHaveBeenCalledWith('card-1');
  });
});
