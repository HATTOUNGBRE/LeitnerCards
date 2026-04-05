import { CardSnapshot } from '../domain/card';
import { CardRepository } from './card.repository';
export declare class ListCardsByOwnerUseCase {
    private readonly cardRepository;
    constructor(cardRepository: CardRepository);
    execute(ownerId: string): Promise<CardSnapshot[]>;
}
