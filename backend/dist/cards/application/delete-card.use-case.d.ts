import { CardRepository } from './card.repository';
export declare class DeleteCardUseCase {
    private readonly cardRepository;
    constructor(cardRepository: CardRepository);
    execute(cardId: string): Promise<void>;
}
