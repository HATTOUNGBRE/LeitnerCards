"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsModule = void 0;
const common_1 = require("@nestjs/common");
const card_id_generator_port_1 = require("./application/card-id-generator.port");
const card_repository_1 = require("./application/card.repository");
const create_card_use_case_1 = require("./application/create-card.use-case");
const delete_card_use_case_1 = require("./application/delete-card.use-case");
const get_card_by_id_use_case_1 = require("./application/get-card-by-id.use-case");
const list_cards_by_owner_use_case_1 = require("./application/list-cards-by-owner.use-case");
const update_card_use_case_1 = require("./application/update-card.use-case");
const in_memory_card_id_generator_1 = require("./infrastructure/identifiers/in-memory-card-id-generator");
const in_memory_card_repository_1 = require("./infrastructure/persistence/in-memory-card.repository");
const cards_controller_1 = require("./interfaces/http/cards.controller");
let CardsModule = class CardsModule {
};
exports.CardsModule = CardsModule;
exports.CardsModule = CardsModule = __decorate([
    (0, common_1.Module)({
        controllers: [cards_controller_1.CardsController],
        providers: [
            {
                provide: card_repository_1.CARD_REPOSITORY,
                useClass: in_memory_card_repository_1.InMemoryCardRepository,
            },
            {
                provide: card_id_generator_port_1.CARD_ID_GENERATOR,
                useClass: in_memory_card_id_generator_1.InMemoryCardIdGenerator,
            },
            {
                provide: create_card_use_case_1.CreateCardUseCase,
                inject: [card_repository_1.CARD_REPOSITORY, card_id_generator_port_1.CARD_ID_GENERATOR],
                useFactory: (cardRepository, cardIdGenerator) => new create_card_use_case_1.CreateCardUseCase(cardRepository, cardIdGenerator),
            },
            {
                provide: get_card_by_id_use_case_1.GetCardByIdUseCase,
                inject: [card_repository_1.CARD_REPOSITORY],
                useFactory: (cardRepository) => new get_card_by_id_use_case_1.GetCardByIdUseCase(cardRepository),
            },
            {
                provide: list_cards_by_owner_use_case_1.ListCardsByOwnerUseCase,
                inject: [card_repository_1.CARD_REPOSITORY],
                useFactory: (cardRepository) => new list_cards_by_owner_use_case_1.ListCardsByOwnerUseCase(cardRepository),
            },
            {
                provide: update_card_use_case_1.UpdateCardUseCase,
                inject: [card_repository_1.CARD_REPOSITORY],
                useFactory: (cardRepository) => new update_card_use_case_1.UpdateCardUseCase(cardRepository),
            },
            {
                provide: delete_card_use_case_1.DeleteCardUseCase,
                inject: [card_repository_1.CARD_REPOSITORY],
                useFactory: (cardRepository) => new delete_card_use_case_1.DeleteCardUseCase(cardRepository),
            },
        ],
        exports: [card_repository_1.CARD_REPOSITORY, card_id_generator_port_1.CARD_ID_GENERATOR],
    })
], CardsModule);
//# sourceMappingURL=cards.module.js.map