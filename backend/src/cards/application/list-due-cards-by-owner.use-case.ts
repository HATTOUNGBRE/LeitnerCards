import { CardSnapshot } from '../domain/card';
import { CardRepository } from './card.repository';

export type ListDueCardsByOwnerCommand = {
  ownerId: string;
  referenceDate?: Date;
};

export class ListDueCardsByOwnerUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(command: ListDueCardsByOwnerCommand): Promise<CardSnapshot[]> {
    const cards = await this.cardRepository.findByOwnerId(command.ownerId);
    const referenceDate = command.referenceDate ?? new Date();

    return cards
      .filter((card) => card.isDueOn(referenceDate))
      .map((card) => card.toSnapshot());
  }
}
