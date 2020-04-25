"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IteratorSelector {
    constructor(expression) {
        if (typeof expression !== "function")
            throw TypeError(`Expression expect a function. ${expression} is a ${typeof expression}.`);
        this.expression = expression;
    }
    get(result, index, url) {
        return this.expression(result, index, url);
    }
}
exports.IteratorSelector = IteratorSelector;
