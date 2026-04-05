import { CardSnapshot } from '../domain/card';
import { CardRepository } from './card.repository';
import { CardNotFoundError } from './card-not-found.error';

export class GetCardByIdUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(cardId: string): Promise<CardSnapshot> {
    const card = await this.cardRepository.findById(cardId);

    if (!card) {
      throw new CardNotFoundError(cardId);
    }

    return card.toSnapshot();
  }
}
