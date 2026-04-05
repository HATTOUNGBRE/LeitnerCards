export const CARD_ID_GENERATOR = Symbol('CARD_ID_GENERATOR');

export interface CardIdGenerator {
  next(): string;
}
