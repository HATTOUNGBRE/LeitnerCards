"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsController = void 0;
const common_1 = require("@nestjs/common");
const create_card_use_case_1 = require("../../application/create-card.use-case");
const delete_card_use_case_1 = require("../../application/delete-card.use-case");
const get_card_by_id_use_case_1 = require("../../application/get-card-by-id.use-case");
const list_cards_by_owner_use_case_1 = require("../../application/list-cards-by-owner.use-case");
const update_card_use_case_1 = require("../../application/update-card.use-case");
const create_card_dto_1 = require("./dto/create-card.dto");
const update_card_dto_1 = require("./dto/update-card.dto");
let CardsController = class CardsController {
    createCardUseCase;
    getCardByIdUseCase;
    listCardsByOwnerUseCase;
    updateCardUseCase;
    deleteCardUseCase;
    constructor(createCardUseCase, getCardByIdUseCase, listCardsByOwnerUseCase, updateCardUseCase, deleteCardUseCase) {
        this.createCardUseCase = createCardUseCase;
        this.getCardByIdUseCase = getCardByIdUseCase;
        this.listCardsByOwnerUseCase = listCardsByOwnerUseCase;
        this.updateCardUseCase = updateCardUseCase;
        this.deleteCardUseCase = deleteCardUseCase;
    }
    create(dto) {
        return this.createCardUseCase.execute(dto);
    }
    findByOwner(ownerId) {
        return this.listCardsByOwnerUseCase.execute(ownerId);
    }
    findById(id) {
        return this.getCardByIdUseCase.execute(id);
    }
    update(id, dto) {
        return this.updateCardUseCase.execute({
            cardId: id,
            question: dto.question,
            answer: dto.answer,
        });
    }
    remove(id) {
        return this.deleteCardUseCase.execute(id);
    }
};
exports.CardsController = CardsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_card_dto_1.CreateCardDto]),
    __metadata("design:returntype", void 0)
], CardsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('ownerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CardsController.prototype, "findByOwner", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CardsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_card_dto_1.UpdateCardDto]),
    __metadata("design:returntype", void 0)
], CardsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CardsController.prototype, "remove", null);
exports.CardsController = CardsController = __decorate([
    (0, common_1.Controller)('cards'),
    __metadata("design:paramtypes", [create_card_use_case_1.CreateCardUseCase,
        get_card_by_id_use_case_1.GetCardByIdUseCase,
        list_cards_by_owner_use_case_1.ListCardsByOwnerUseCase,
        update_card_use_case_1.UpdateCardUseCase,
        delete_card_use_case_1.DeleteCardUseCase])
], CardsController);
//# sourceMappingURL=cards.controller.js.map