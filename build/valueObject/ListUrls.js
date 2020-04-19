"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Url_1 = require("./Url");
var ListUrls = (function () {
    function ListUrls(urlArray) {
        if (!(urlArray instanceof Array))
            throw TypeError("Urls expect a array. " + urlArray + " is a " + typeof urlArray + ".");
        this.urlArray = urlArray.map(function (url) {
            var currentUrl = new Url_1.Url(url);
            return currentUrl.toString();
        });
    }
    ListUrls.prototype.get = function () {
        return this.urlArray;
    };
    return ListUrls;
}());
exports.ListUrls = ListUrls;
//# sourceMappingURL=ListUrls.js.map