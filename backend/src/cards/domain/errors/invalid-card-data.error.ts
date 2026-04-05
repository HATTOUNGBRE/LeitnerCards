export class InvalidCardDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCardDataError';
  }
}
