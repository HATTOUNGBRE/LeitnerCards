import { CardSnapshot } from '../domain/card';
import { CardRepository } from './card.repository';
export declare class GetCardByIdUseCase {
    private readonly cardRepository;
    constructor(cardRepository: CardRepository);
    execute(cardId: string): Promise<CardSnapshot>;
}
