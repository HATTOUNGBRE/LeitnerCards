import { InMemoryCardIdGenerator } from './in-memory-card-id-generator';

describe('InMemoryCardIdGenerator', () => {
  it('returns sequential card identifiers', () => {
    const generator = new InMemoryCardIdGenerator();

    expect(generator.next()).toBe('card-1');
    expect(generator.next()).toBe('card-2');
    expect(generator.next()).toBe('card-3');
  });
});
