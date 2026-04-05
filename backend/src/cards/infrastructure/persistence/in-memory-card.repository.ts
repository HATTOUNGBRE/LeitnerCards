import { Injectable } from '@nestjs/common';
import { Card, CardSnapshot } from '../../domain/card';
import { CardRepository } from '../../application/card.repository';

@Injectable()
export class InMemoryCardRepository implements CardRepository {
  private readonly cards = new Map<string, CardSnapshot>();

  async save(card: Card): Promise<void> {
    this.cards.set(card.id, card.toSnapshot());
  }

  async findById(id: string): Promise<Card | null> {
    const snapshot = this.cards.get(id);
    return snapshot ? Card.rehydrate(snapshot) : null;
  }

  async findByOwnerId(ownerId: string): Promise<Card[]> {
    return Array.from(this.cards.values())
      .filter((snapshot) => snapshot.ownerId === ownerId)
      .map((snapshot) => Card.rehydrate(snapshot));
  }

  async findByTags(tags: string[]): Promise<Card[]> {
    const normalizedTags = tags
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean);

    if (!normalizedTags.length) {
      return this.findAll();
    }

    return Array.from(this.cards.values())
      .filter((snapshot) =>
        snapshot.tag
          ? normalizedTags.includes(snapshot.tag.toLowerCase())
          : false,
      )
      .map((snapshot) => Card.rehydrate(snapshot));
  }

  async findAll(): Promise<Card[]> {
    return Array.from(this.cards.values()).map((snapshot) =>
      Card.rehydrate(snapshot),
    );
  }

  async deleteById(id: string): Promise<void> {
    this.cards.delete(id);
  }
}
