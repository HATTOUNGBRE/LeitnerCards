"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCardUseCase = void 0;
const card_not_found_error_1 = require("./card-not-found.error");
class DeleteCardUseCase {
    cardRepository;
    constructor(cardRepository) {
        this.cardRepository = cardRepository;
    }
    async execute(cardId) {
        const existingCard = await this.cardRepository.findById(cardId);
        if (!existingCard) {
            throw new card_not_found_error_1.CardNotFoundError(cardId);
        }
        await this.cardRepository.deleteById(cardId);
    }
}
exports.DeleteCardUseCase = DeleteCardUseCase;
//# sourceMappingURL=delete-card.use-case.js.map