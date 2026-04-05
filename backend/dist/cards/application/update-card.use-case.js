"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCardUseCase = void 0;
const card_not_found_error_1 = require("./card-not-found.error");
class UpdateCardUseCase {
    cardRepository;
    constructor(cardRepository) {
        this.cardRepository = cardRepository;
    }
    async execute(command) {
        const existingCard = await this.cardRepository.findById(command.cardId);
        if (!existingCard) {
            throw new card_not_found_error_1.CardNotFoundError(command.cardId);
        }
        const updatedCard = existingCard.updateContent({
            question: command.question,
            answer: command.answer,
        });
        await this.cardRepository.save(updatedCard);
        return updatedCard.toSnapshot();
    }
}
exports.UpdateCardUseCase = UpdateCardUseCase;
//# sourceMappingURL=update-card.use-case.js.map