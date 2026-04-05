"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = exports.INITIAL_CARD_CATEGORY = void 0;
const invalid_card_data_error_1 = require("./errors/invalid-card-data.error");
exports.INITIAL_CARD_CATEGORY = 1;
class Card {
    snapshot;
    constructor(snapshot) {
        this.snapshot = snapshot;
    }
    static create(props) {
        const id = Card.normalizeRequiredField(props.id, 'Card id is required.');
        const ownerId = Card.normalizeRequiredField(props.ownerId, 'Card owner id is required.');
        const question = Card.normalizeRequiredField(props.question, 'Card question is required.');
        const answer = Card.normalizeRequiredField(props.answer, 'Card answer is required.');
        return new Card({
            id,
            ownerId,
            question,
            answer,
            category: exports.INITIAL_CARD_CATEGORY,
            createdAt: props.createdAt ?? new Date(),
        });
    }
    static rehydrate(snapshot) {
        const id = Card.normalizeRequiredField(snapshot.id, 'Card id is required.');
        const ownerId = Card.normalizeRequiredField(snapshot.ownerId, 'Card owner id is required.');
        const question = Card.normalizeRequiredField(snapshot.question, 'Card question is required.');
        const answer = Card.normalizeRequiredField(snapshot.answer, 'Card answer is required.');
        if (!Card.isValidCategory(snapshot.category)) {
            throw new invalid_card_data_error_1.InvalidCardDataError('Card category must be between 1 and 7.');
        }
        return new Card({
            id,
            ownerId,
            question,
            answer,
            category: snapshot.category,
            createdAt: snapshot.createdAt,
        });
    }
    get id() {
        return this.snapshot.id;
    }
    get ownerId() {
        return this.snapshot.ownerId;
    }
    get question() {
        return this.snapshot.question;
    }
    get answer() {
        return this.snapshot.answer;
    }
    get category() {
        return this.snapshot.category;
    }
    get createdAt() {
        return this.snapshot.createdAt;
    }
    updateContent(props) {
        const question = Card.normalizeRequiredField(props.question, 'Card question is required.');
        const answer = Card.normalizeRequiredField(props.answer, 'Card answer is required.');
        return new Card({
            ...this.snapshot,
            question,
            answer,
        });
    }
    toSnapshot() {
        return { ...this.snapshot };
    }
    static isValidCategory(category) {
        return Number.isInteger(category) && category >= 1 && category <= 7;
    }
    static normalizeRequiredField(value, message) {
        const normalizedValue = value?.trim();
        if (!normalizedValue) {
            throw new invalid_card_data_error_1.InvalidCardDataError(message);
        }
        return normalizedValue;
    }
}
exports.Card = Card;
//# sourceMappingURL=card.js.map