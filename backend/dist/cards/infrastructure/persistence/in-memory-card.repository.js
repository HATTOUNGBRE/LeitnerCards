"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCardRepository = void 0;
const common_1 = require("@nestjs/common");
const card_1 = require("../../domain/card");
let InMemoryCardRepository = class InMemoryCardRepository {
    cards = new Map();
    async save(card) {
        this.cards.set(card.id, card.toSnapshot());
    }
    async findById(id) {
        const snapshot = this.cards.get(id);
        return snapshot ? card_1.Card.rehydrate(snapshot) : null;
    }
    async findByOwnerId(ownerId) {
        return Array.from(this.cards.values())
            .filter((snapshot) => snapshot.ownerId === ownerId)
            .map((snapshot) => card_1.Card.rehydrate(snapshot));
    }
    async deleteById(id) {
        this.cards.delete(id);
    }
};
exports.InMemoryCardRepository = InMemoryCardRepository;
exports.InMemoryCardRepository = InMemoryCardRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryCardRepository);
//# sourceMappingURL=in-memory-card.repository.js.map