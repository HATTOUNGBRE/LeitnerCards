import { CardRepository } from './card.repository';
import { CardNotFoundError } from './card-not-found.error';

export class DeleteCardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(cardId: string): Promise<void> {
    const existingCard = await this.cardRepository.findById(cardId);

    if (!existingCard) {
      throw new CardNotFoundError(cardId);
    }

    await this.cardRepository.deleteById(cardId);
  }
}
