import { CardSnapshot } from '../domain/card';
import { CardRepository } from './card.repository';

export class ListCardsByOwnerUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(ownerId: string): Promise<CardSnapshot[]> {
    const cards = await this.cardRepository.findByOwnerId(ownerId);
    return cards.map((card) => card.toSnapshot());
  }
}
