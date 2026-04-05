import { Card } from '../domain/card';
export declare const CARD_REPOSITORY: unique symbol;
export interface CardRepository {
    save(card: Card): Promise<void>;
    findById(id: string): Promise<Card | null>;
    findByOwnerId(ownerId: string): Promise<Card[]>;
    deleteById(id: string): Promise<void>;
}
