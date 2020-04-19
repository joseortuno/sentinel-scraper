"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
var Url = (function () {
    function Url(url) {
        if (arguments.length === 0)
            throw ReferenceError("The instance of Scraper expect a parameter.");
        if (typeof url !== "string")
            throw TypeError("Url expect a string. " + url + " is a " + typeof url + ".");
        if (!URL_REGEX.test(url))
            throw TypeError("The instance of Scraper expect at parameter a url.");
        this.url = url;
    }
    Url.prototype.toString = function () {
        return this.url.toString();
    };
    return Url;
}());
exports.Url = Url;
//# sourceMappingURL=Url.js.map