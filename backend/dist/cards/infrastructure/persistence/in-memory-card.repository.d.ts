import { Card } from '../../domain/card';
import { CardRepository } from '../../application/card.repository';
export declare class InMemoryCardRepository implements CardRepository {
    private readonly cards;
    save(card: Card): Promise<void>;
    findById(id: string): Promise<Card | null>;
    findByOwnerId(ownerId: string): Promise<Card[]>;
    deleteById(id: string): Promise<void>;
}
