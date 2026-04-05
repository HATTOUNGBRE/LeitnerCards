export class CardNotFoundError extends Error {
  constructor(cardId: string) {
    super(`Card "${cardId}" was not found.`);
    this.name = 'CardNotFoundError';
  }
}
