"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCardIdGenerator = void 0;
const common_1 = require("@nestjs/common");
let InMemoryCardIdGenerator = class InMemoryCardIdGenerator {
    sequence = 0;
    next() {
        this.sequence += 1;
        return `card-${this.sequence}`;
    }
};
exports.InMemoryCardIdGenerator = InMemoryCardIdGenerator;
exports.InMemoryCardIdGenerator = InMemoryCardIdGenerator = __decorate([
    (0, common_1.Injectable)()
], InMemoryCardIdGenerator);
//# sourceMappingURL=in-memory-card-id-generator.js.map