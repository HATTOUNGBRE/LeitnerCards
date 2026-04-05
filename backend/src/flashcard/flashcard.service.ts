import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { flashcards } from '../data/data';
import { Flashcard } from '../models/flashcard.model';

const LEITNER_INTERVALS: Record<number, number> = {
  1: 1, 2: 2, 3: 4, 4: 8, 5: 16, 6: 32, 7: 64,
};

@Injectable()
export class FlashcardService {

  getAll(): Flashcard[] {
    return flashcards;
  }

  getByTag(tag: string): Flashcard[] {
    return flashcards.filter((c) => c.tags.includes(tag.toLowerCase()));
  }

  getDueForReview(): Flashcard[] {
    const today = new Date();
    return flashcards.filter((card) => this.isDue(card, today));
  }

  create(question: string, answer: string, tags: string[] = []): Flashcard {
    const card: Flashcard = {
      id: uuidv4(),
      question,
      answer,
      category: 1,
      tags: tags.map((t) => t.toLowerCase()),
      updatedAt: null,
      createdAt: new Date(),
      isLearned: false,
    };
    flashcards.push(card);
    return card;
  }

  answer(id: string, isCorrect: boolean): Flashcard {
    const card = flashcards.find((c) => c.id === id);
    if (!card) throw new NotFoundException(`Flashcard ${id} not found`);

    if (isCorrect) {
      if (card.category === 7) {
        card.isLearned = true;
      } else {
        card.category += 1;
      }
    } else {
      card.category = 1;
    }

    card.updatedAt = new Date();
    return card;
  }

  private isDue(card: Flashcard, today: Date): boolean {
    if (card.isLearned) return false;
    if (!card.updatedAt) return true;

    const interval = LEITNER_INTERVALS[card.category];
    const next = new Date(card.updatedAt);
    next.setDate(next.getDate() + interval);
    return today >= next;
  }
}