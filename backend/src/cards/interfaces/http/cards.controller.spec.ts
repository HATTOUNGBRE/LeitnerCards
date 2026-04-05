import { CardsController } from './cards.controller';
import { CreateCardUseCase } from '../../application/create-card.use-case';
import { GetCardByIdUseCase } from '../../application/get-card-by-id.use-case';
import { ListCardsByOwnerUseCase } from '../../application/list-cards-by-owner.use-case';
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
    });
  });

  it('delegates card deletion to the use case', async () => {
    (deleteCardUseCase.execute as jest.Mock).mockResolvedValue(undefined);

    await expect(controller.remove('card-1')).resolves.toBeUndefined();
    expect(deleteCardUseCase.execute).toHaveBeenCalledWith('card-1');
  });
});
