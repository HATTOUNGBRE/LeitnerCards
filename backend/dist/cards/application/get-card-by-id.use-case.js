"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCardByIdUseCase = void 0;
const card_not_found_error_1 = require("./card-not-found.error");
class GetCardByIdUseCase {
    cardRepository;
    constructor(cardRepository) {
        this.cardRepository = cardRepository;
    }
    async execute(cardId) {
        const card = await this.cardRepository.findById(cardId);
        if (!card) {
            throw new card_not_found_error_1.CardNotFoundError(cardId);
        }
        return card.toSnapshot();
    }
}
exports.GetCardByIdUseCase = GetCardByIdUseCase;
//# sourceMappingURL=get-card-by-id.use-case.js.map