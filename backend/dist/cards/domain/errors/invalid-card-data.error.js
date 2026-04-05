"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCardDataError = void 0;
class InvalidCardDataError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidCardDataError';
    }
}
exports.InvalidCardDataError = InvalidCardDataError;
//# sourceMappingURL=invalid-card-data.error.js.map