import { CreateCardUseCase } from '../../application/create-card.use-case';
import { DeleteCardUseCase } from '../../application/delete-card.use-case';
import { GetCardByIdUseCase } from '../../application/get-card-by-id.use-case';
import { ListCardsByOwnerUseCase } from '../../application/list-cards-by-owner.use-case';
import { UpdateCardUseCase } from '../../application/update-card.use-case';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
export declare class CardsController {
    private readonly createCardUseCase;
    private readonly getCardByIdUseCase;
    private readonly listCardsByOwnerUseCase;
    private readonly updateCardUseCase;
    private readonly deleteCardUseCase;
    constructor(createCardUseCase: CreateCardUseCase, getCardByIdUseCase: GetCardByIdUseCase, listCardsByOwnerUseCase: ListCardsByOwnerUseCase, updateCardUseCase: UpdateCardUseCase, deleteCardUseCase: DeleteCardUseCase);
    create(dto: CreateCardDto): Promise<import("../../domain/card").CardSnapshot>;
    findByOwner(ownerId: string): Promise<import("../../domain/card").CardSnapshot[]>;
    findById(id: string): Promise<import("../../domain/card").CardSnapshot>;
    update(id: string, dto: UpdateCardDto): Promise<import("../../domain/card").CardSnapshot>;
    remove(id: string): Promise<void>;
}
