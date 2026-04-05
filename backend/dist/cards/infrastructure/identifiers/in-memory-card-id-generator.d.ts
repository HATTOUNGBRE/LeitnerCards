import { CardIdGenerator } from '../../application/card-id-generator.port';
export declare class InMemoryCardIdGenerator implements CardIdGenerator {
    private sequence;
    next(): string;
}
