"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IteratorSelector = (function () {
    function IteratorSelector(expression) {
        if (typeof expression !== "function")
            throw TypeError("Expression expect a function. " + expression + " is a " + typeof expression + ".");
        this.expression = expression;
    }
    IteratorSelector.prototype.get = function (result, index, url) {
        return this.expression(result, index, url);
    };
    return IteratorSelector;
}());
exports.IteratorSelector = IteratorSelector;
