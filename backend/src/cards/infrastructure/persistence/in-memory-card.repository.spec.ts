import { Card } from '../../domain/card';
import { InMemoryCardRepository } from './in-memory-card.repository';

describe('InMemoryCardRepository', () => {
  it('saves and retrieves a card by id', async () => {
    const repository = new InMemoryCardRepository();
    const card = Card.create({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'What is CQRS?',
      answer: 'Command Query Responsibility Segregation.',
    });

    await repository.save(card);

    const result = await repository.findById('card-1');

    expect(result?.toSnapshot()).toEqual({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'What is CQRS?',
      answer: 'Command Query Responsibility Segregation.',
      tag: undefined,
      category: 1,
      createdAt: expect.any(Date),
      nextReviewAt: expect.any(Date),
      learned: false,
    });
  });

  it('lists cards for a specific owner only', async () => {
    const repository = new InMemoryCardRepository();
    const firstCard = Card.create({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'Question 1',
      answer: 'Answer 1',
      tag: 'TagA',
    });
    const secondCard = Card.create({
      id: 'card-2',
      ownerId: 'user-1',
      question: 'Question 2',
      answer: 'Answer 2',
      tag: 'TagB',
    });
    const thirdCard = Card.create({
      id: 'card-3',
      ownerId: 'user-2',
      question: 'Question 3',
      answer: 'Answer 3',
      tag: 'TagA',
    });

    await repository.save(firstCard);
    await repository.save(secondCard);
    await repository.save(thirdCard);

    const result = await repository.findByOwnerId('user-1');

    expect(result.map((card) => card.id)).toEqual(['card-1', 'card-2']);
  });

  it('finds cards by tag', async () => {
    const repository = new InMemoryCardRepository();
    const firstCard = Card.create({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'Question 1',
      answer: 'Answer 1',
      tag: 'Teamwork',
    });
    const secondCard = Card.create({
      id: 'card-2',
      ownerId: 'user-1',
      question: 'Question 2',
      answer: 'Answer 2',
      tag: 'Productivity',
    });

    await repository.save(firstCard);
    await repository.save(secondCard);

    const result = await repository.findByTags(['teamwork']);

    expect(result.map((card) => card.id)).toEqual(['card-1']);
  });

  it('returns all cards when no tags are provided', async () => {
    const repository = new InMemoryCardRepository();
    const card = Card.create({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'Question',
      answer: 'Answer',
    });

    await repository.save(card);

    const result = await repository.findByTags([]);

    expect(result.map((card) => card.id)).toEqual(['card-1']);
  });

  it('deletes a card by id', async () => {
    const repository = new InMemoryCardRepository();
    const card = Card.create({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'Question',
      answer: 'Answer',
    });

    await repository.save(card);
    await repository.deleteById('card-1');

    await expect(repository.findById('card-1')).resolves.toBeNull();
  });
});
