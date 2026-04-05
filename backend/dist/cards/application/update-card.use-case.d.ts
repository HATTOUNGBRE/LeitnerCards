import { CardSnapshot } from '../domain/card';
import { CardRepository } from './card.repository';
export type UpdateCardCommand = {
    cardId: string;
    question: string;
    answer: string;
};
export declare class UpdateCardUseCase {
    private readonly cardRepository;
    constructor(cardRepository: CardRepository);
    execute(command: UpdateCardCommand): Promise<CardSnapshot>;
}
