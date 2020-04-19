"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Selector = (function () {
    function Selector(selector) {
        if (typeof selector !== "string")
            throw TypeError("Selector expect a string. " + selector + " is a " + typeof selector + ".");
        this.selector = selector;
    }
    Selector.prototype.toString = function () {
        return this.selector.toString();
    };
    return Selector;
}());
exports.Selector = Selector;
//# sourceMappingURL=Selector.js.map