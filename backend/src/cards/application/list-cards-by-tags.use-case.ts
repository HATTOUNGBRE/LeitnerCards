import { CardSnapshot } from '../domain/card';
import { CardRepository } from './card.repository';

export type ListCardsByTagsCommand = {
  tags: string[];
};

export class ListCardsByTagsUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(command: ListCardsByTagsCommand): Promise<CardSnapshot[]> {
    const cards = await this.cardRepository.findByTags(command.tags);
    return cards.map((card) => card.toSnapshot());
  }
}
