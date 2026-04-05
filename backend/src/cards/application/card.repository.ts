import { Card } from '../domain/card';

export const CARD_REPOSITORY = Symbol('CARD_REPOSITORY');

export interface CardRepository {
  save(card: Card): Promise<void>;
  findById(id: string): Promise<Card | null>;
  findByOwnerId(ownerId: string): Promise<Card[]>;
  findByTags(tags: string[]): Promise<Card[]>;
  findAll(): Promise<Card[]>;
  deleteById(id: string): Promise<void>;
}
