export declare const CARD_ID_GENERATOR: unique symbol;
export interface CardIdGenerator {
    next(): string;
}
