"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCardsByOwnerUseCase = void 0;
class ListCardsByOwnerUseCase {
    cardRepository;
    constructor(cardRepository) {
        this.cardRepository = cardRepository;
    }
    async execute(ownerId) {
        const cards = await this.cardRepository.findByOwnerId(ownerId);
        return cards.map((card) => card.toSnapshot());
    }
}
exports.ListCardsByOwnerUseCase = ListCardsByOwnerUseCase;
//# sourceMappingURL=list-cards-by-owner.use-case.js.map