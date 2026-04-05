import { Card } from '../domain/card';
export declare const CARD_REPOSITORY: any;
export interface CardRepository {
    save(card: Card): Promise<void>;
    findById(id: string): Promise<Card | null>;
    findByOwnerId(ownerId: string): Promise<Card[]>;
    deleteById(id: string): Promise<void>;
}
