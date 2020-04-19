"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Selector = (function () {
    function Selector(selector) {
        this.selector = selector;
    }
    Selector.prototype.toString = function () {
        return this.selector.toString();
    };
    return Selector;
}());
exports.Selector = Selector;
