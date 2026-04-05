import { CardSnapshot } from '../domain/card';
import { CardRepository } from './card.repository';
import { CardNotFoundError } from './card-not-found.error';

export type ReviewCardCommand = {
  cardId: string;
  isValid: boolean;
  referenceDate?: Date;
};

export class ReviewCardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(command: ReviewCardCommand): Promise<CardSnapshot> {
    const card = await this.cardRepository.findById(command.cardId);

    if (!card) {
      throw new CardNotFoundError(command.cardId);
    }

    const reviewedCard = card.applyAnswer(
      command.isValid,
      command.referenceDate,
    );

    await this.cardRepository.save(reviewedCard);

    return reviewedCard.toSnapshot();
  }
}
