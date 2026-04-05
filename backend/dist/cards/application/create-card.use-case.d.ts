import { CardSnapshot } from '../domain/card';
import { CardIdGenerator } from './card-id-generator.port';
import { CardRepository } from './card.repository';
export type CreateCardCommand = {
    ownerId: string;
    question: string;
    answer: string;
};
export declare class CreateCardUseCase {
    private readonly cardRepository;
    private readonly cardIdGenerator;
    constructor(cardRepository: CardRepository, cardIdGenerator: CardIdGenerator);
    execute(command: CreateCardCommand): Promise<CardSnapshot>;
}
