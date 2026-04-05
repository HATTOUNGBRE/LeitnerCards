"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardNotFoundError = void 0;
class CardNotFoundError extends Error {
    constructor(cardId) {
        super(`Card "${cardId}" was not found.`);
        this.name = 'CardNotFoundError';
    }
}
exports.CardNotFoundError = CardNotFoundError;
//# sourceMappingURL=card-not-found.error.js.map