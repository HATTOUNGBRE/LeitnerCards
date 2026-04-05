import { CardSnapshot } from '../domain/card';
import { CardRepository } from './card.repository';
import { CardNotFoundError } from './card-not-found.error';

export type UpdateCardCommand = {
  cardId: string;
  question: string;
  answer: string;
  tag?: string;
};

export class UpdateCardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(command: UpdateCardCommand): Promise<CardSnapshot> {
    const existingCard = await this.cardRepository.findById(command.cardId);

    if (!existingCard) {
      throw new CardNotFoundError(command.cardId);
    }

    const updatedCard = existingCard.updateContent({
      question: command.question,
      answer: command.answer,
      tag: command.tag,
    });

    await this.cardRepository.save(updatedCard);

    return updatedCard.toSnapshot();
  }
}
