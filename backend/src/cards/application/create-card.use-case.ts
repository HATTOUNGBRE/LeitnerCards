import { Card, CardSnapshot } from '../domain/card';
import { CardIdGenerator } from './card-id-generator.port';
import { CardRepository } from './card.repository';

export type CreateCardCommand = {
  ownerId: string;
  question: string;
  answer: string;
  tag?: string;
};

export class CreateCardUseCase {
  constructor(
    private readonly cardRepository: CardRepository,
    private readonly cardIdGenerator: CardIdGenerator,
  ) {}

  async execute(command: CreateCardCommand): Promise<CardSnapshot> {
    const card = Card.create({
      id: this.cardIdGenerator.next(),
      ownerId: command.ownerId,
      question: command.question,
      answer: command.answer,
      tag: command.tag,
    });

    await this.cardRepository.save(card);

    return card.toSnapshot();
  }
}
