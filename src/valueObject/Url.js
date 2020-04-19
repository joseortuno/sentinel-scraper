"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
var Url = (function () {
    function Url(url) {
        if (!URL_REGEX.test(url))
            throw TypeError("The instance of Url expects a valid parameter");
        this.url = url;
    }
    Url.prototype.toString = function () {
        return this.url.toString();
    };
    return Url;
}());
exports.Url = Url;
