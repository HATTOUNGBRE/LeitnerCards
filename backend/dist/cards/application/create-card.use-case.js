"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCardUseCase = void 0;
const card_1 = require("../domain/card");
class CreateCardUseCase {
    cardRepository;
    cardIdGenerator;
    constructor(cardRepository, cardIdGenerator) {
        this.cardRepository = cardRepository;
        this.cardIdGenerator = cardIdGenerator;
    }
    async execute(command) {
        const card = card_1.Card.create({
            id: this.cardIdGenerator.next(),
            ownerId: command.ownerId,
            question: command.question,
            answer: command.answer,
        });
        await this.cardRepository.save(card);
        return card.toSnapshot();
    }
}
exports.CreateCardUseCase = CreateCardUseCase;
//# sourceMappingURL=create-card.use-case.js.map